import { AlbumInterface } from './albums.interfaces';

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
  key: string;
  name: string;
  musics: number;
  albums: string;
}
