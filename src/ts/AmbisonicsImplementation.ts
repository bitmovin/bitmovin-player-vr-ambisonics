export interface AmbisonicsImplementation {
  start(mediaElement: HTMLMediaElement): Promise<void>;
  release(): Promise<void>;
  enable(): void;
  disable(): void;
  update(rotationMatrix: number[]): void;
}