import { IconNameEnum } from '../enums/icon-name.enum';

export interface IconPropsInterface {
  name: IconNameEnum;
  isActive?: boolean;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
}
