import { ReactNode } from 'react';
import { InputIconPositionEnum } from '../enum/input-icon-position.enum';
import { InputTypeEnum } from '../enum/input-type.enum';

export interface InputPropsInterface {
  icon?: ReactNode;
  iconPosition?: InputIconPositionEnum;
  type: InputTypeEnum;
  placeholder: string;
  isDark: boolean;
  className?: string;
}
