import { useRecoilValue } from 'recoil';
import Button from '../Button/Button';
import { ButtonTypeEnum } from '../Button/enums/button-type.enum';
import Input from '../Input/Input';
import { InputTypeEnum } from '../Input/enum/input-type.enum';
import styles from './PlaylistModal.module.scss';
import { PlaylistModalPropsInterface } from './interfaces/playlist-modal-props.interface';
import { PlaylistModalType } from './types/playlist-modal.type';
import { isDarkState } from '@/app/States/States';

const PlaylistModal: PlaylistModalType = (
  props: PlaylistModalPropsInterface,
) => {
  const isDark: boolean = useRecoilValue(isDarkState);
  const className: string = isDark ? styles.dark : styles.light;
  return (
    <div className={`${className} ${styles.modalWrapper}`}>
      <div className={styles.headingWrapper}>
        <span className={`${className} ${styles.heading}`}>
          {props.heading}
        </span>
      </div>
      <div className={styles.contentWrapper}>
        <span className={`${className} ${styles.title}`}>{props.title}</span>
        <Input
          type={InputTypeEnum.Text}
          placeholder={'Add Title'}
          isDark={false}
        />
      </div>
      <Button type={ButtonTypeEnum.Primary}>Create</Button>
    </div>
  );
};
export default PlaylistModal;
