import MainPage from './(authorized)/mainPage/page';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <MainPage />
        </div>
      </div>
    </>
  );
}
