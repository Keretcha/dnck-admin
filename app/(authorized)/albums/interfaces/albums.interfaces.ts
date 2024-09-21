import { ArtistInterface } from './artist.interfaces';
import { MusicInterface } from './track.interface';

export interface AlbumInterface {
  history: { location: string };
  musics: MusicInterface[];
  id: number;
  name: string;
  artists: ArtistInterface[];
  imgUrl: string;
  releaseDate: string;
  createdAt: string;
}
