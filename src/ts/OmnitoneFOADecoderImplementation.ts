import {AmbisonicsImplementation} from './AmbisonicsImplementation';
import {FOADecoder, Omnitone} from 'omnitone';

/**
 * Implements Ambisonic decoding with Omnitone's FOADecoder. This is just implemented for the sake of demonstrating
 * that different renderers can be used through the same interface. The FOADecoder is deprecated and it's recommended
 * to use FOARenderer instead.
 * https://github.com/GoogleChrome/omnitone
 */
export class OmnitoneFOADecoderImplementation implements AmbisonicsImplementation {

  private audioContext: AudioContext;
  private foaDecoder: FOADecoder;

  start(context: AudioContext, mediaElement: HTMLMediaElement): Promise<void> {
    this.audioContext = context;

    this.foaDecoder = Omnitone.createFOADecoder(this.audioContext, mediaElement, {
      channelMap: [0, 3, 1, 2],
    });

    return this.foaDecoder.initialize();
  }

  release(): Promise<void> {
    this.disable();
    return Promise.resolve();
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