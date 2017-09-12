declare module 'omnitone' {
  class FOAConvolver {
    //
  }

  class FOADecoder {
    constructor(context: AudioContext, videoElement: HTMLMediaElement, options: object);
  }

  class FOAPhaseMatchedFilter {
    constructor(context: AudioContext);
  }

  type RenderingMode = 'ambisonic' | 'bypass' | 'off';

  interface FOARendererOptions {
    channelMap?: number[];
    HRIRUrl?: string;
    postGainDB?: number;
    renderingMode?: RenderingMode;
  }

  class FOARenderer {
    constructor(context: AudioContext, options: FOARendererOptions);
    initialize(): Promise<void>;
    setRenderingMode(renderingMode: RenderingMode): void;
    setChannelMap(channelMap: number[]): void;
    setRotationMatrix(matrix: number[]): void;
    setRotationMatrixFromCamera(cameraMatrix: object): void;
    input: GainNode;
    output: GainNode;
  }

  class FOARotator {
    constructor(context: AudioContext, ambisonicOrder: number);
  }

  class FOARouter {
    constructor(context: AudioContext, channelMap: number[]);
  }

  class FOAVirtualSpeaker {
    constructor(context: AudioContext, options: object);
  }

  class Omnitone {
    static createFOAConvolver(context: AudioContext, options: object): FOAConvolver;

    /**
     * @deprecated
     */
    static createFOADecoder(context: AudioContext, videoElement: HTMLMediaElement, options: object): FOADecoder;

    static createFOAPhaseMatchedFilter(context: AudioContext): FOAPhaseMatchedFilter;

    static createFOARenderer(context: AudioContext, options: FOARendererOptions): FOARenderer;

    static createFOARotator(context: AudioContext, ambisonicOrder: number): FOARotator;

    static createFOARouter(context: AudioContext, channelMap: number[]): FOARouter;

    static createFOAVirtualSpeaker(context: AudioContext, options: object): FOAVirtualSpeaker;
  }
}