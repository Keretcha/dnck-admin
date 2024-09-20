export interface ArtistInterface {
  id(id: any): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | (() => import("react").ReactElement) | undefined;
  albums: any;
  musics: any;
  name: string;
  firstName: string;
  lastName: string;
  biography: string;
}
