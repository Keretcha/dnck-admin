import { MusicInterface } from './music.interface';

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
