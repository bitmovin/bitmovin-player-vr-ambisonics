import {AmbisonicsImplementation} from './AmbisonicsImplementation';
import {FOADecoder, Omnitone} from 'omnitone';

export class OmnitoneFOADecoderImplementation implements AmbisonicsImplementation {

  private audioContext: AudioContext;
  private foaDecoder: FOADecoder;

  start(mediaElement: HTMLMediaElement): Promise<void> {
    this.audioContext = new AudioContext();

    this.foaDecoder = Omnitone.createFOADecoder(this.audioContext, mediaElement, {
      channelMap: [0, 3, 1, 2],
    });

    return this.foaDecoder.initialize();
  }

  release(): Promise<void> {
    this.disable();
    return this.audioContext.close();
  }

  enable(): void {
    this.foaDecoder.setMode('ambisonic');
  }

  disable(): void {
    this.foaDecoder.setMode('bypass');
  }

  update(rotationMatrix: number[]): void {
    this.foaDecoder.setRotationMatrix(rotationMatrix);
  }
}