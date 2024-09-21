export interface UserInterface {
  key: string;
  id: number;
  email: string;
  password: string;
  history: { location: string };
  artists: string[];
}
