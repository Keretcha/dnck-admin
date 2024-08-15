import { ReactNode } from 'react';
import { HeadingTypeEnum } from '../enums/heading-type.enum';

export interface HeadingPropsInterface {
  type: HeadingTypeEnum;
  children: ReactNode;
  isDark?: boolean;
}
