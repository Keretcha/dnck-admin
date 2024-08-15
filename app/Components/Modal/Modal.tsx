'use client';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './Modal.module.scss';
import { ModalPropsInterface } from './interfaces/modal-props.interface';
import { ModalType } from './types/modal.type';
import { isDarkState } from '@/app/States/States';

const Modal: ModalType = (props: ModalPropsInterface) => {
  const isDark: boolean = useRecoilValue(isDarkState);
  const className: string = isDark ? styles.dark : styles.light;

  useEffect(() => {
    const handleEscape = (event: { key: string }): void => {
      if (event.key === 'Escape') {
        props.setIsOpen(false);
      }
    };
    if (props.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return (): void => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [props, props.isOpen, props.setIsOpen]);

  if (!props.isOpen) return null;

  const onClick = (): void => {
    props.setIsOpen(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={`${className} ${styles.modal}`}>
        <div>
          <button
            className={`${className} ${styles.closeButton}`}
            onClick={onClick}
          >
            x
          </button>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
