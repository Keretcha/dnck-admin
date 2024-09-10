'use client';
import { useState } from 'react';
import Icon from '../Icon/Icon';
import { IconNameEnum } from '../Icon/enums/icon-name.enum';
import styles from './PlayButtonMobile.module.scss';
import { PlayButtonMobilePropsInterface } from './interfaces/play-button-mobile-props.interface';
import { PlayButtonMobileType } from './types/play-button-mobile.type';

const PlayButtonMobile: PlayButtonMobileType = (
  props: PlayButtonMobilePropsInterface,
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const className: string = styles.dark;
  const playIcon: IconNameEnum = IconNameEnum.Play;
  const pauseIcon: IconNameEnum = props.isDark
    ? IconNameEnum.Pause
    : IconNameEnum.Pause;
  const icon: IconNameEnum = isPlaying ? pauseIcon : playIcon;

  const onClick = (): void => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <button
      onClick={() => {
        onClick();
        props.onClick();
      }}
      className={`${className} ${styles.playButton}`}
      style={{ width: props.width, height: props.width }}
    >
      <Icon
        name={icon}
        isActive={false}
        width={isPlaying ? 20 : 32}
        height={isPlaying ? 20 : 32}
      />
    </button>
  );
};

export default PlayButtonMobile;
