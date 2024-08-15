import { RefObject } from 'react';

export type usePlayerType = {
  togglePlay: () => void;
  playerRef: RefObject<HTMLAudioElement>;
};
