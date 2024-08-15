'use client';
import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import { IconNameEnum } from '../Icon/enums/icon-name.enum';
import styles from './PlayButton.module.scss';
import { PlayButtonPropsInterface } from './interfaces/play-button-props.interface';
import { PlayButtonType } from './types/play-button.type';

const PlayButton: PlayButtonType = (props: PlayButtonPropsInterface) => {
  const [isPlaying, setIsPLaying] = useState(false);
  const iconName: IconNameEnum = isPlaying
    ? IconNameEnum.Pause
    : IconNameEnum.Play;

  const onClick = (): void => {
    setIsPLaying((prevState) => !prevState);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.code === 'Space') {
        event.preventDefault();
        onClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <button
      onClick={() => {
        onClick();
        props.onClick();
      }}
      className={styles.playButton}
      style={{ width: props.width, height: props.width }}
    >
      <Icon
        name={iconName}
        isActive={false}
        width={isPlaying ? 20 : 36}
        height={isPlaying ? 20 : 36}
      />
    </button>
  );
};
export default PlayButton;
