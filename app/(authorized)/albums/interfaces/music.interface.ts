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
  id(
    id: any,
  ):
    | import('react').ReactElement<
        any,
        string | import('react').JSXElementConstructor<any>
      >
    | (() => import('react').ReactElement)
    | undefined;
  key: string;
  name: string;
  musics: number;
  albums?: string;
}
