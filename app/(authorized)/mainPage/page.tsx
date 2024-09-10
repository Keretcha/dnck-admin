import AlbumCards from '../../Components/AlbumCards/AlbumCards';
import AlbumItems from '../../Components/AlbumItems/AlbumItems';
import ContentHeading from '../../Components/ContentHeading/ContentHeading';
import { HitsItems } from '../../Components/HitsCard/HitsItems/HitsItems';
import HitsCards from '../../Components/HitsCards/HitsCards';
// import { MainPageType } from '../Components/MainPage/types/main-Page.type';
import styles from './page.module.scss';

export default function MainPage(): JSX.Element {
  return (
    <div className="container">
      <div className={styles.pageContent}>
        <div className={styles.sections}>
          <div className={styles.content}>
            <ContentHeading>Recently Added Artists</ContentHeading>
            <div className={styles.cards}>
              <HitsCards items={HitsItems} />
            </div>
          </div>
          <div className={styles.content}>
            <ContentHeading>Recently Added Albums</ContentHeading>
            <div className={styles.cards}>
              <AlbumCards items={AlbumItems} />
            </div>
          </div>
          <div className={styles.content}>
            <ContentHeading>Recently Added Artists</ContentHeading>
            <div className={styles.cards}>
              <HitsCards items={HitsItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default MainPage;
