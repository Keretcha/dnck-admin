import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import { NavItemPropsInterface } from '../../NavItem/interfaces/nav-item-props.interface';

export const headerNavItems: NavItemPropsInterface[] = [
  {
    icon: IconNameEnum.Home,
    href: '/',
    title: 'Home',
  },
  {
    icon: IconNameEnum.Microphone,
    href: '/artist',
    title: 'Artists',
  },
  {
    icon: IconNameEnum.Album,
    href: '/albums',
    title: 'Albums',
  },
  {
    icon: IconNameEnum.PlayList,
    href: '/musics',
    title: 'Musics',
  },
];

export const navBarItems: NavItemPropsInterface[] = [
  {
    icon: IconNameEnum.UsersProfile,
    href: '/users',
    title: 'Users',
  },
  {
    icon: IconNameEnum.AdminPlaylist,
    href: '/playlist',
    title: 'Playlist',
  },
];
