import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import { IconNameEnum } from '../Icon/enums/icon-name.enum';
import PlayButton from '../PlayButton/PlayButton';
import styles from './MusicPlayer.module.scss';
import { MusicPlayerPropsInterface } from './interfaces/music-player-props.interface';
import { MusicPlayerType } from './types/music-player.type';
import { usePlayer } from '@/app/Hooks/usePlayer/usePlayer';

const MusicPlayer: MusicPlayerType = (props: MusicPlayerPropsInterface) => {
  const { playerRef, togglePlay } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement: HTMLAudioElement | null = playerRef.current;
    if (audioElement) {
      const updateProgress = (): void => {
        setCurrentTime(audioElement.currentTime);
      };
      audioElement.addEventListener('timeupdate', updateProgress);
      return (): void => {
        audioElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  });

  const handleProgressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (playerRef.current) {
      playerRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (playerRef.current) {
      playerRef.current.volume = Number(event.target.value);
    }
  };

  return (
    <div>
      <div
        className={styles.music}
        style={{ backgroundImage: `url(${props.BackgroundImage})` }}
      >
        <div className={styles.musicPlayer}>
          <div className={styles.heading}>
            <h1>{props.MusicTitle}</h1>
            <span>{props.ArtistName}</span>
          </div>
          <div>
            <input
              className={styles.input}
              type="range"
              min="0"
              max={playerRef.current?.duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleProgressChange}
            />
            <audio src="/music.mp4" ref={playerRef}></audio>
          </div>
          <div className={styles.playerBoard}>
            <Icon
              name={IconNameEnum.Shuffle}
              isActive={true}
              width={24}
              height={24}
            />

            <div className={styles.player}>
              <Icon
                name={IconNameEnum.BackwardDesktop}
                width={26}
                height={26}
              />
              <PlayButton
                icon={IconNameEnum.Pause}
                onClick={togglePlay}
                width={48}
                height={48}
              />
              <Icon name={IconNameEnum.ForwardDesktop} width={26} height={26} />
            </div>
            <div className={styles.volumeControl}>
              <div className={styles.volume}>
                <Icon
                  name={IconNameEnum.Volume}
                  isActive={true}
                  width={24}
                  height={24}
                />
              </div>
              <div className={styles.volumeInput}>
                <input
                  className={styles.volumeStyle}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={handleVolumeChange}
                  defaultValue="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MusicPlayer;
