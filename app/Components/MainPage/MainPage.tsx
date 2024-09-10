import AlbumCards from '../AlbumCards/AlbumCards';
import AlbumItems from '../AlbumItems/AlbumItems';
import ContentHeading from '../ContentHeading/ContentHeading';
import { HitsItems } from '../HitsCard/HitsItems/HitsItems';
import HitsCards from '../HitsCards/HitsCards';
import styles from './MainPage.module.scss';
import { MainPageType } from './types/main-Page.type';

const MainPage: MainPageType = () => {
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
};

export default MainPage;
