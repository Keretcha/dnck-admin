'use client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { IconNameEnum } from '../Icon/enums/icon-name.enum';
import styles from './Header.module.scss';
import SearchInput from './SearchInput/SearchInput';
import { HeaderType } from './Type/Header.type';
import Upload from './UploadButton/Upload';
import { eraseCookie } from '@/helpers/cookies';

const Header: HeaderType = () => {
  const router: AppRouterInstance = useRouter();

  const onClick = (): void => {
    eraseCookie('accessToken');
    router.push('/login');
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search}>
          <SearchInput />
        </div>
        <div onClick={onClick}>
          <Upload href={'/login'} icon={IconNameEnum.Logout}>
            Logout
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default Header;
