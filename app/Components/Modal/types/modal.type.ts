import { ReactElement } from 'react';
import { ModalPropsInterface } from '../interfaces/modal-props.interface';

export type ModalType = (props: ModalPropsInterface) => ReactElement | null;
