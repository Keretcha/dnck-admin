import { ReactNode } from 'react';
import { DropDownPositionEnum } from '../enums/dropdown-position.enum';
import { DropDownItemsInterface } from './dropdown-items-props.interface';

export interface DropdownPropsInterface {
  icon: ReactNode;
  position: DropDownPositionEnum;
  items: DropDownItemsInterface[];
}
