'use client';

import Link from 'next/link';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import Icon from '../../Icon/Icon';
import styles from './Upload.module.scss';
import { UploadButtonInterfaces } from './interfaces/upload-button.interfaces';

const Upload = (props: UploadButtonInterfaces): JSX.Element => {
  return (
    <div className={styles.active}>
      <div className={styles.button}>
        <Link href={props.href}>
          <Button type={ButtonTypeEnum.Primary} className={styles.uploadButton}>
            {props.children}
            <Icon name={props.icon} width={24} height={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Upload;
