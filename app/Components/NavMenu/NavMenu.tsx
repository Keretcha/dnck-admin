import NavItem from '../NavItem/NavItem';
import { NavItemPropsInterface } from '../NavItem/interfaces/nav-item-props.interface';
import styles from './NavMenu.module.scss';
import { NavMenuType } from './types/nav-menu.type';

const NavMenu: NavMenuType = (props: { items: NavItemPropsInterface[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {props.items.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            href={item.href}
            title={item.title}
            className={item?.className}
          />
        ))}
      </div>
    </div>
  );
};
export default NavMenu;
