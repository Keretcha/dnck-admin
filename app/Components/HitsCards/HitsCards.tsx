import HitsCard from '../HitsCard/HitsCard';
import { HitsCardItemsInterface } from '../HitsCard/interfaces/hits-card-items.interface';
import styles from './HitsCards.module.scss';

const HitsCards = (props: { items: HitsCardItemsInterface[] }): JSX.Element => {
  return (
    <div className={styles.container}>
      {props.items?.map((item, index) => (
        <HitsCard
          key={index}
          backgroundImage={item.backgroundImage}
          name={item.name}
          album={item.album}
          src={item.src}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default HitsCards;
