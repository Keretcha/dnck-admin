import { DropDownItemsInterface } from '@/app/Components/Dropdown/interfaces/dropdown-items-props.interface';
import { IconNameEnum } from '@/app/Components/Icon/enums/icon-name.enum';

export const DropDownItems: DropDownItemsInterface[] = [
  {
    icon: IconNameEnum.Microphone,
    title: 'Artist',
    href: '/createArtist',
  },
  {
    icon: IconNameEnum.Album,
    title: 'Album',
    href: '/createAlbum',
  },
  {
    icon: IconNameEnum.PlayList,
    title: 'Music',
    href: '/addMusic',
  },
];
