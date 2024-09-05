import MainPage from './mainPage/page';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={styles.content}>
      <MainPage />
    </div>
  );
}
