import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { AlbumCardItemsInterface } from './album-card-items.interface';

export interface AlbumCardPropsInterface extends AlbumCardItemsInterface {
  image: string | StaticImport;
  albumName: string;
  darkMode?: boolean;
}
