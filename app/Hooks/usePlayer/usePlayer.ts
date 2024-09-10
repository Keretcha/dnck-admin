import { RefObject, useRef } from 'react';
import { usePlayerType } from './types/use-player.type';

export const usePlayer = (): usePlayerType => {
  const playerRef: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null);

  const togglePlay = (): void => {
    if (playerRef?.current?.paused) {
      playerRef?.current.play();
    } else {
      playerRef?.current?.pause();
    }
  };

  return { playerRef, togglePlay };
};
