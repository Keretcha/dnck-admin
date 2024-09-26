import { HitsCardItemsInterface } from '@/app/Components/HitsCard/interfaces/hits-card-items.interface';

interface DataType {
  id(id: any): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | (() => import("react").ReactElement) | undefined;
  key: string;
  name: HitsCardItemsInterface;
  musics: string;
  albums: string;
}
export default DataType;
