'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { TextHtmlTypeEnum } from '../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Text/enums/text-type.enum';
import styles from './NavItem.module.scss';
import { NavItemPropsInterface } from './interfaces/nav-item-props.interface';
import { NavItemsType } from './types/nav-item.type';

const NavItems: NavItemsType = (props: NavItemPropsInterface) => {
  const pathName: string = usePathname();
  const isActive: boolean = pathName === props.href;

  return (
    <Link
      className={`${styles.container} ${props.className}`}
      href={props.href}
    >
      <div className={isActive ? styles.activeContainer : styles.container}>
        <Icon name={props.icon} width={24} height={24} />
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.PrimaryTextLarge}
          className={styles.navTitle}
        >
          {props.title}
        </Text>
      </div>
    </Link>
  );
};

export default NavItems;
