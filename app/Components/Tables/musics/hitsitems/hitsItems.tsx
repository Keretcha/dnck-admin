import styles from './hitsitems.module.scss';
import { HitsCardItemsInterface } from '@/app/Components/HitsCard/interfaces/hits-card-items.interface';

const HitsItemDisplay: React.FC<{ item: HitsCardItemsInterface }> = ({
  item,
}) => (
  <div className={styles.container}>
    <div
      style={{
        backgroundImage: `url(${item.backgroundImage})`,
        width: 50,
        height: 50,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    ></div>
    <div>
      <div>{item.artistName}</div>
      <div>{item.albumName}</div>
    </div>
  </div>
);

export default HitsItemDisplay;
