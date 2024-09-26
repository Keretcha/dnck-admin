import { DropDownItemsInterface } from '../../Dropdown/DropdownContainer/interfaces/dropdown-container.props.interface';
import { ArtistInterface } from '@/app/(authorized)/albums/interfaces/artist.interfaces';

export interface AlbumCardItemsInterface {
  dropDownItems: DropDownItemsInterface[];
  imgUrl?: string | undefined;
  artists: ArtistInterface[] | undefined;
  title: string;
  href?: string;
  id: number;
}
