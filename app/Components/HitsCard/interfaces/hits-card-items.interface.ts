import { DropDownItemsInterface } from '../../Dropdown/interfaces/dropdown-items-props.interface';
import { PlayButtonPropsInterface } from '../../PlayButton/interfaces/play-button-props.interface';

export interface HitsCardItemsInterface {
  dropDownItems?: DropDownItemsInterface[];
  backgroundImage: string;
  artistName: string;
  albumName: string;
  button?: PlayButtonPropsInterface[];
}
