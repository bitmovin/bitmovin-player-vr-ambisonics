/// <reference path='../../node_modules/bitmovin-player-ui/src/ts/player.d.ts' />
import PlayerEvent = bitmovin.PlayerAPI.PlayerEvent;
import AudioTrack = bitmovin.PlayerAPI.AudioTrack;
import AudioChangedEvent = bitmovin.PlayerAPI.AudioChangedEvent;
import MediaTrackRole = bitmovin.PlayerAPI.MediaTrackRole;
import VRViewingDirectionChangeEvent = bitmovin.PlayerAPI.VRViewingDirectionChangeEvent;
import {AmbisonicsImplementation} from './AmbisonicsImplementation';
import {OmnitoneFOARendererImplementation} from './OmnitoneFOARendererImplementation';

export interface AmbisonicsConfig {
  /**
   * Tells if the first Ambisonic audio track, if existing, should be automatically selected for a VR source.
   * Default: true
   */
  autoSelectAmbisonicAudio?: boolean;
  /**
   * The offset around the y-axis in radians. Can be used to apply a rotation offset to adjust
   * the audio to the video field.
   * Default: 0
   */
  yawOffset?: number;
}

export class Ambisonics {

  private static VR_SCHEME_ID_URI = 'https://bitmovin.com/082017/vr';
  private static VR_SCHEME_VALUE_FOA = 'ambisonic-fo';

  private player: bitmovin.PlayerAPI;
  private config: AmbisonicsConfig;
  private mediaElement: HTMLMediaElement;
  private audioContext: AudioContext;
  private implementation: AmbisonicsImplementation;
  private enabled: boolean;

  constructor(player: bitmovin.PlayerAPI, config: AmbisonicsConfig = {}) {
    this.player = player;
    this.config = config;

    this.config.autoSelectAmbisonicAudio = config.autoSelectAmbisonicAudio || true;
    this.config.yawOffset = config.yawOffset || 0;

    player.addEventHandler(player.EVENT.ON_READY, this.onPlayerReady);
    player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);

    // In case this instance was created after a source has been loaded into the player, we do not wait for the next
    // ON_SOURCE_LOADED event but initialize directly.
    if (player.isReady()) {
      this.initialize();
    }
  }

  public release(): void {
    this.disable();
    this.player.removeEventHandler(this.player.EVENT.ON_READY, this.onPlayerReady);
    this.player.removeEventHandler(this.player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);
    this.implementation.release();
  }

  private initialize() {
    this.audioContext = new AudioContext();
    this.mediaElement = (<any>this.player).getVideoElement();

    if (Ambisonics.isVrContent(this.player) && this.config.autoSelectAmbisonicAudio) {
      const audioTracks = this.player.getAvailableAudio();
      const ambisonicAudioTrack = Ambisonics.findFirstAmbisonicTrack(audioTracks);

      console.log(audioTracks, ambisonicAudioTrack);

      if (ambisonicAudioTrack) {
        this.player.setAudio(ambisonicAudioTrack.id);
        console.debug('Autoselected first Ambisonics audio track', ambisonicAudioTrack);
      }
    }
  }

  private enable(): void {
    if (!Ambisonics.isVrContent(this.player)) {
      // Don't enable Ambisonics for non-VR content because it does not make any sense
      return;
    }

    if (this.enabled) {
      // Don't do anything if already enabled
      return;
    }

    // Create the FOARenderer only the first time it is required, then we reuse it
    if (!this.implementation) {
      this.implementation = new OmnitoneFOARendererImplementation();
      this.implementation.start(this.audioContext, this.mediaElement).catch(error => console.error(error));
    } else {
      // Re-enable Ambisonics processing (in case it has been disabled earlier)
      this.implementation.enable();
    }

    this.player.addEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE,
      this.onPlayerVrViewingDirectionChange);

    this.enabled = true;
  }

  private disable(): void {
    if (!this.enabled) {
      // Don't do anything if already disabled
      return;
    }

    // Disable rotation handling
    this.player.removeEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE,
      this.onPlayerVrViewingDirectionChange);

    // Disable Ambisonics processing
    this.implementation.disable();

    this.enabled = false;
  }

  private static isVrContent(player: bitmovin.PlayerAPI): boolean {
    // We can't use this in ON_READY as the VR handler is not yet loaded in there.
    // We also can't check player.vr namespace availability for the same reason.
    // return player.getVRStatus().contentType !== 'none';

    // As a workaround, we check the source config because the player treats every source as VR
    // source when the vr property in the source is set.
    // TODO use method above once ON_READY is fixed
    return !!player.getConfig().source && !!player.getConfig().source.vr;
  }

  private static isAmbisonicTrack(audioTrack: AudioTrack): boolean {
    const audioTrackRoles: MediaTrackRole[] = (<any>audioTrack).role;

    if (audioTrackRoles && audioTrackRoles.length > 0) {
      for (let audioTrackRole of audioTrackRoles) {
        if (audioTrackRole.schemeIdUri === Ambisonics.VR_SCHEME_ID_URI
          && audioTrackRole.value === Ambisonics.VR_SCHEME_VALUE_FOA) {
          return true;
        }
      }
    }

    return false;
  }

  private static findFirstAmbisonicTrack(audioTracks: AudioTrack[]): AudioTrack {
    // We iterate over all available audio tracks and check their roles to see if one is an Ambisonics track.
    for (const audioTrack of audioTracks) {
      if (Ambisonics.isAmbisonicTrack(audioTrack)) {
        return audioTrack;
      }
    }

    return null;
  }

  /**
   * Converts yaw/pitch/roll into a 3x3 rotation matrix.
   * @param {bitmovin.PlayerAPI.VR.ViewingDirection} direction the viewing direction from the player
   * @param {AmbisonicsConfig} config
   * @return {number[]} 3x3 rotation matrix
   */
  private static getRotationMatrix(direction: bitmovin.PlayerAPI.VR.ViewingDirection,
                                   config: AmbisonicsConfig): number[] {
    // Convert degrees to radians
    const degToRad = Math.PI / 180;
    const yaw = direction.yaw * degToRad;
    const pitch = direction.pitch * degToRad;
    const roll = direction.roll * degToRad;

    // The Bitmovin player assumes 0 degree at the left of the equirectangular projection,
    // while the source assumes it in the center, so we must correct our angles for the
    // Ambisonics audio to match the VR video viewport.
    const correctedYaw = yaw + config.yawOffset;
    const correctedPitch = pitch;
    const correctedRoll = roll;

    // Convert yaw/pitch/roll to matrix: http://planning.cs.uiuc.edu/node102.html
    const alpha = correctedYaw; // z-axis
    const beta = correctedPitch; // y-axis
    const gamma = correctedRoll; // x-axis
    const sinAlpha = Math.sin(alpha);
    const cosAlpha = Math.cos(alpha);
    const sinBeta = Math.sin(beta);
    const cosBeta = Math.cos(beta);
    const sinGamma = Math.sin(gamma);
    const cosGamma = Math.cos(gamma);

    return [
      cosAlpha * cosBeta,
      cosAlpha * sinBeta * sinGamma - sinAlpha * cosGamma,
      cosAlpha * sinBeta * cosGamma + sinAlpha * sinGamma,
      sinAlpha * cosBeta,
      sinAlpha * sinBeta * sinGamma + cosAlpha * cosGamma,
      sinAlpha * sinBeta * cosGamma - cosAlpha * sinGamma,
      -sinBeta,
      cosBeta * sinGamma,
      cosBeta * cosGamma,
    ];
  }

  private onPlayerReady = (event: PlayerEvent) => {
    this.initialize();
  };

  private onPlayerAudioChanged = (event: AudioChangedEvent) => {
    const isOldAudioTrackAmbisonic = Ambisonics.isAmbisonicTrack(event.sourceAudio);
    const isNewAudioTrackAmbisonic = Ambisonics.isAmbisonicTrack(event.targetAudio);

    if (!isOldAudioTrackAmbisonic && isNewAudioTrackAmbisonic) {
      console.debug('Activated Ambisonics audio', event.targetAudio);
      this.enable();
    } else if (isOldAudioTrackAmbisonic && !isNewAudioTrackAmbisonic) {
      console.debug('Deactivated Ambisonics audio', event.targetAudio);
      this.disable();
    }
  };

  private onPlayerVrViewingDirectionChange = (event: VRViewingDirectionChangeEvent) => {
    console.log('VRViewingDirectionChange', event.direction);
    const rotationMatrix = Ambisonics.getRotationMatrix(event.direction, this.config);
    this.implementation.update(rotationMatrix);
  };
}