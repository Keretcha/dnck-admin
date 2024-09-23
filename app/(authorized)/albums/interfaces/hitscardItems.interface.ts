import { AlbumInterface } from './albums.interfaces';
import { DropDownItemsInterface } from '@/app/Components/Dropdown/interfaces/dropdown-items-props.interface';
import { PlayButtonPropsInterface } from '@/app/Components/PlayButton/interfaces/play-button-props.interface';

export interface HitsCardItemsInterfaces {
  dropDownItems?: DropDownItemsInterface[];
  backgroundImage: string;
  button?: PlayButtonPropsInterface[];
  src?: string;
  name: string;
  id: number;
  album: AlbumInterface;
}
