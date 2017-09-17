import {AmbisonicsImplementation} from './AmbisonicsImplementation';
import {FOARenderer, Omnitone} from 'omnitone';

export class OmnitoneFOARendererImplementation implements AmbisonicsImplementation {

  private audioContext: AudioContext;
  private audioSource: MediaElementAudioSourceNode;
  private foaRenderer: FOARenderer;

  start(mediaElement: HTMLMediaElement): Promise<void> {
    this.audioContext = new AudioContext();
    this.audioSource = this.audioContext.createMediaElementSource(mediaElement);

    this.foaRenderer = Omnitone.createFOARenderer(this.audioContext, {
      HRIRUrl: 'https://cdn.rawgit.com/GoogleChrome/omnitone/962089ca/build/resources/sh_hrir_o_1.wav',
      // Remap channels from FuMa ordering (W,X,Y,Z) to ACN
      channelMap: [0, 3, 1, 2],
    });

    return this.foaRenderer.initialize().then(() => {
      this.audioSource.connect(this.foaRenderer.input);
      this.foaRenderer.output.connect(this.audioContext.destination);
    });
  }

  release(): Promise<void> {
    this.disable();
    this.audioSource.disconnect(this.foaRenderer.input);
    this.foaRenderer.output.disconnect(this.audioContext.destination);
    return this.audioContext.close();
  }

  enable(): void {
    this.foaRenderer.setRenderingMode('ambisonic');
  }

  disable(): void {
    this.foaRenderer.setRenderingMode('bypass');
  }

  update(rotationMatrix: number[]): void {
    this.foaRenderer.setRotationMatrix(rotationMatrix);
  }
}