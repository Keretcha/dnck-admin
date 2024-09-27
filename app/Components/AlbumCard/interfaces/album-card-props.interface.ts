import { AlbumCardItemsInterface } from './album-card-items.interface';

export interface AlbumCardPropsInterface extends AlbumCardItemsInterface {
  image?: string;
  albumName: string;
  darkMode?: boolean;
  href?: string;
}
