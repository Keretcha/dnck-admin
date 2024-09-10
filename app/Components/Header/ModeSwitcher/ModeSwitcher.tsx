'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isDarkState } from '../../../States/States';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import styles from './ModeSwitcher.module.scss';

const ModeSwitcher = (): JSX.Element => {
  const [dark, setDark] = useRecoilState(isDarkState);

  const onClick: () => void = () => {
    localStorage.setItem('isDark', String(!dark));
    setDark(!dark);
  };

  useEffect(() => {
    const item: boolean = localStorage.getItem('isDark') === 'true';
    setDark(item);
  }, [setDark]);

  useEffect(() => {
    const body: HTMLElement = document.getElementsByTagName('body')[0];
    if (dark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className={dark ? styles.darkContainer : styles.lightContainer}>
      <div onClick={onClick} className={styles.modes}>
        <div>
          <Icon
            name={dark ? IconNameEnum.Sun : IconNameEnum.Moon}
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default ModeSwitcher;
