import { DropDownItemsInterface } from '../../Dropdown/interfaces/dropdown-items-props.interface';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { ArtistInterface } from '@/app/(authorized)/albums/interfaces/artist.interfaces';

export interface HitsCardItemsInterface {
  artistName: ReactNode;
  dropDownItems?: DropDownItemsInterface[];
  backgroundImage: string;
  album: AlbumInterface;
  src: string;
  name?: string;
  id: number;
  albumName?: string;
  artist?: ArtistInterface;
}
