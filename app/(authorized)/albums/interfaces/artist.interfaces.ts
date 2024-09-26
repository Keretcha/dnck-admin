import { MusicInterface } from './music.interface';

export interface ArtistInterface {
  artists: string;
  id: number;
  musics: MusicInterface[];
  firstName: string;
  lastName: string;
  biography: string;
  history: { location: string };
}
