import { ReactNode } from 'react';
import { TextHtmlTypeEnum } from '../enums/text-html-type.enum';
import { TextTypeEnum } from '../enums/text-type.enum';

export interface PrimaryTextPropsInterface {
  htmlType: TextHtmlTypeEnum;
  type: TextTypeEnum;
  color?: { lightColor: string; darkColor: string };
  children: ReactNode;
  isDark?: boolean;
  className?: string;
}
