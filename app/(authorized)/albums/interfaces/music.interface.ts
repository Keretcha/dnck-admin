import { AlbumInterface } from './albums.interfaces';
import { ArtistInterface } from './artist.interfaces';

export interface MusicInterface {
  id: number;
  name: string;
  album: AlbumInterface;
  src: string;
  history: {
    location: string;
  };
}

export interface TableDataType {
  id: number;
  key: string;
  name: string;
  musics: number;
  albums?: AlbumInterface;
  artists?: ArtistInterface[];
}
