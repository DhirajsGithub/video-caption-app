export interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface AppState {
  videoUrl: string;
  captions: Caption[];
  currentTime: number;
  isPlaying: boolean;
}
