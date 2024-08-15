import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <h1 className={styles.logo}>DNCK</h1>
      </Link>
    </div>
  );
};

export default Logo;
