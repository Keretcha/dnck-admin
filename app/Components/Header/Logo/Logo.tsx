import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo = (): JSX.Element => {
  return (
    <div className={styles.content}>
      <Link href={'/'}>
        <Image
          src={'/icons/logoferadi.svg'}
          alt={'logooo'}
          width={124}
          height={124}
        />
      </Link>
    </div>
  );
};

export default Logo;
