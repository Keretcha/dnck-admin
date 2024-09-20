import Header from '../Header/Header';
import {
  headerNavItems,
  navBarItems,
} from '../Header/HeaderNavItems/HeaderNavItems';
import Logo from '../Header/Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import Text from '../Text/Text';
import { TextHtmlTypeEnum } from '../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Text/enums/text-type.enum';
import styles from './AdminHeader.module.scss';
import { AdminHeaderPropsInterface } from './interfaces/admin-header-props.interface';

const AdminHeader = (props: AdminHeaderPropsInterface): JSX.Element => {
  return (
    <div className={styles.headers}>
      <div className={styles.navigation}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.navbar}>
          <NavMenu items={headerNavItems} />
          <div className={styles.managment}>
            <Text
              htmlType={TextHtmlTypeEnum.P}
              type={TextTypeEnum.SecondaryTextMedium}
              className={styles.navBarText}
            >
              Managment:
            </Text>
            <NavMenu items={navBarItems} />
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <div>
          <Header />
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};
export default AdminHeader;
