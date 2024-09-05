'use client';

import Authorization from './logIn/page';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Authorization />
          {/* <MainPage /> */}
        </div>
      </div>
    </>
  );
}
