import { ArtistInterface } from './artist.interfaces';
import { TrackInterface } from './track.interface';

export interface AlbumInterface {
  history: any;
  accessToken(arg0: string, accessToken: any, arg2: number): unknown;
  tracks: TrackInterface[];
  id: number;
  name: string;
  artists: ArtistInterface[];
  imgUrl: string;
  releaseDate: string;
  createdAt: string;
}
