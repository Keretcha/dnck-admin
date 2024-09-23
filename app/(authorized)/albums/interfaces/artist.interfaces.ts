import { AlbumInterface } from './albums.interfaces';
import { MusicInterface } from './track.interface';

export interface ArtistInterface {
  artists: any;
  id: number;
  musics: MusicInterface[];
  name: string;
  firstName: string;
  lastName: string;
  biography: string;
  history: { location: string };
}
