import PlayerEvent = bitmovin.PlayerAPI.PlayerEvent;
import AudioTrack = bitmovin.PlayerAPI.AudioTrack;
import AudioChangedEvent = bitmovin.PlayerAPI.AudioChangedEvent;
import {FOARenderer, Omnitone, RenderingMode} from 'omnitone';

/**
 * Temporary type definition for the {@link bitmovin.PlayerAPI.AudioTrack.role} property.
 * TODO remove once bitmovin-player-ui types have been updated with the role property
 */
interface AudioTrackRole {
  schemeIdUri: string;
  value: string;
}

/**
 * Temporary type definition for the {@link bitmovin.PlayerAPI.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE} event object.
 * TODO remove once bitmovin-player-ui types have been updated with the event
 */
interface VRViewingDirectionChangeEvent extends PlayerEvent {
  direction: bitmovin.PlayerAPI.VR.ViewingDirection;
}

export interface AmbisonicsConfig {
  autoSelectAmbisonicAudio?: boolean;
}

export class Ambisonics {

  private static VR_SCHEME_ID_URI = 'https://bitmovin.com/082017/vr';
  private static VR_SCHEME_VALUE_FOA = 'ambisonic-fo';

  private player: bitmovin.PlayerAPI;
  private config: AmbisonicsConfig;
  private foaRenderer: FOARenderer;

  constructor(player: bitmovin.PlayerAPI, config: AmbisonicsConfig = {}) {
    this.player = player;
    this.config = config;

    this.config.autoSelectAmbisonicAudio = config.autoSelectAmbisonicAudio || true;

    player.addEventHandler(player.EVENT.ON_READY, this.onPlayerReady);
    player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);

    // In case this instance was created after a source has been loaded into the player, we do not wait for the next
    // ON_SOURCE_LOADED event but initialize directly.
    if (player.isReady()) {
      this.initialize();
    }
  }

  public release(): void {
    this.disableAmbisonics();
    this.player.removeEventHandler(this.player.EVENT.ON_READY, this.onPlayerReady);
    this.player.removeEventHandler(this.player.EVENT.ON_AUDIO_CHANGED, this.onPlayerAudioChanged);
  }

  private initialize() {
    if (this.config.autoSelectAmbisonicAudio) {
      const ambisonicAudioTrack = this.getFirstAmbisonicTrack();

      if (ambisonicAudioTrack) {
        this.player.setAudio(ambisonicAudioTrack.id);
        console.debug('Autoselected first Ambisonics audio track', ambisonicAudioTrack);
      }
    }
  }

  private isAmbisonicTrack(audioTrack: AudioTrack): boolean {
    const audioTrackRoles: AudioTrackRole[] = (<any>audioTrack).role;

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

  private getFirstAmbisonicTrack(): AudioTrack {
    const audioTracks = this.player.getAvailableAudio();
    console.log(audioTracks);

    // We iterate over all available audio tracks and check their roles to see if one is an Ambisonics track.
    for (const audioTrack of audioTracks) {
      if (this.isAmbisonicTrack(audioTrack)) {
        return audioTrack;
      }
    }

    return null;
  }

  private enableAmbisonics(): void {
    // Create the FOARenderer only the first time it is required, then we reuse it
    if (!this.foaRenderer) {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaElementSource((<any>this.player).getVideoElement());

      this.foaRenderer = Omnitone.createFOARenderer(audioContext, {
        HRIRUrl: 'https://cdn.rawgit.com/GoogleChrome/omnitone/962089ca/build/resources/sh_hrir_o_1.wav',
        // channelMap: [0, 3, 1, 2],
      });

      this.foaRenderer.initialize().then(() => {
        audioSource.connect(this.foaRenderer.input);
        this.foaRenderer.output.connect(audioContext.destination);
      }, (onInitializationError) => {
        console.error(onInitializationError);
      });
    } else {
      // Re-enable Ambisonics processing (in case it has been disabled earlier)
      this.foaRenderer.setRenderingMode(RenderingMode.AMBISONIC);
    }

    this.player.addEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE,
      this.onPlayerVrViewingDirectionChange);
  }

  private disableAmbisonics(): void {
    // Disable rotation handling
    this.player.removeEventHandler(this.player.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE,
      this.onPlayerVrViewingDirectionChange);

    // Disable Ambisonics processing
    this.foaRenderer.setRenderingMode(RenderingMode.BYPASS);
  }

  private getRotationMatrix(direction: bitmovin.PlayerAPI.VR.ViewingDirection): number[] {
    // Convert degrees to radians
    const degToRad = Math.PI / 180;
    const yaw = direction.yaw * degToRad;
    const pitch = direction.pitch * degToRad;
    const roll = direction.roll * degToRad;

    // Convert yaw/pitch/roll to matrix: http://planning.cs.uiuc.edu/node102.html
    const alpha = yaw; // z-axis
    const beta = pitch; // y-axis
    const gamma = roll; // x-axis
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
    const isOldAudioTrackAmbisonic = this.isAmbisonicTrack(event.sourceAudio);
    const isNewAudioTrackAmbisonic = this.isAmbisonicTrack(event.targetAudio);

    if (!isOldAudioTrackAmbisonic && isNewAudioTrackAmbisonic) {
      console.debug('Activated Ambisonics audio', event.targetAudio);
      this.enableAmbisonics();
    } else if (isOldAudioTrackAmbisonic && !isNewAudioTrackAmbisonic) {
      console.debug('Deactivated Ambisonics audio', event.targetAudio);
      this.disableAmbisonics();
    }
  };

  private onPlayerVrViewingDirectionChange = (event: VRViewingDirectionChangeEvent) => {
    console.log('VRViewingDirectionChange', event.direction);
    this.foaRenderer.setRotationMatrix(this.getRotationMatrix(event.direction));
  }
}