export interface AmbisonicsImplementation {
  start(context: AudioContext, mediaElement: HTMLMediaElement): Promise<void>;
  release(): Promise<void>;
  enable(): void;
  disable(): void;
  update(rotationMatrix: number[]): void;
}