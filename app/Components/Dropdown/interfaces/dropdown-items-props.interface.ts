import { IconNameEnum } from '../../Icon/enums/icon-name.enum';

export interface DropDownItemsInterface {
  title: string;
  icon: IconNameEnum;
  href: string;
  onClick?: () => void;
}
