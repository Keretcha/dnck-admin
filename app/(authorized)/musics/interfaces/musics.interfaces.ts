import { AlbumInterface } from '../../albums/interfaces/albums.interfaces';
import { MusicInterface } from '../../albums/interfaces/music.interface';

interface DataType {
  key: number;
  musics: MusicInterface;
  album: AlbumInterface;
}

export default DataType;
