import styles from './Header.module.scss';
import SearchInput from './SearchInput/SearchInput';
import { HeaderType } from './Type/Header.type';
import Upload from './UploadButton/Upload';

const Header: HeaderType = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search}>
          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default Header;
