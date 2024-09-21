export interface Album {
  key: string;
  id: string;
  name: string;
  musics: number[];
  history: { location: string };
  artists: string[];
}
