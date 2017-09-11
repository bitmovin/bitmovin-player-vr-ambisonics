import PlayerEvent = bitmovin.PlayerAPI.PlayerEvent;
import AudioTrack = bitmovin.PlayerAPI.AudioTrack;

/**
 * Temporary type definition for the {@link bitmovin.PlayerAPI.AudioTrack.role} property.
 * TODO remove once bitmovin-player-ui types have been updated with the role property
 */
interface AudioTrackRole {
  schemeIdUri: string;
  value: string;
}

export interface AmbisonicsConfig {
  autoSelectAmbisonicAudio?: boolean;
}

export class Ambisonics {

  private static VR_SCHEME_ID_URI = 'https://bitmovin.com/082017/vr';
  private static VR_SCHEME_VALUE_FOA = 'ambisonic-fo';

  private player: bitmovin.PlayerAPI;
  private config: AmbisonicsConfig;

  constructor(player: bitmovin.PlayerAPI, config: AmbisonicsConfig = {}) {
    this.player = player;
    this.config = config;

    this.config.autoSelectAmbisonicAudio = config.autoSelectAmbisonicAudio || true;

    player.addEventHandler(player.EVENT.ON_READY, this.onPlayerReady);

    // In case this instance was created after a source has been loaded into the player, we do not wait for the next
    // ON_SOURCE_LOADED event but initialize directly.
    if (player.isReady()) {
      this.initialize();
    }
  }

  public release(): void {
    this.player.removeEventHandler(this.player.EVENT.ON_READY, this.onPlayerReady);
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

  private getFirstAmbisonicTrack(): AudioTrack {
    const audioTracks = this.player.getAvailableAudio();
    console.log(audioTracks);

    // We iterate over all available audio tracks and check their roles to see if one is an Ambisonics track.
    for (const audioTrack of audioTracks) {
      const audioTrackRoles: AudioTrackRole[] = (<any>audioTrack).role;
      if (audioTrackRoles && audioTrackRoles.length > 0) {
        for (let audioTrackRole of audioTrackRoles) {
          if (audioTrackRole.schemeIdUri === Ambisonics.VR_SCHEME_ID_URI
            && audioTrackRole.value === Ambisonics.VR_SCHEME_VALUE_FOA) {
            return audioTrack;
          }
        }
      }
    }

    return null;
  }

  private onPlayerReady = (event: PlayerEvent) => {
    this.initialize();
  };
}