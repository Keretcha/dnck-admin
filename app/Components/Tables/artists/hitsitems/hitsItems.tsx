import React, { CSSProperties } from 'react';
import styles from './hitsitems.module.scss';
import { HitsCardItemsInterface } from '@/app/Components/HitsCard/interfaces/hits-card-items.interface';

const HitsItemDisplay: React.FC<{ item?: HitsCardItemsInterface }> = ({
  item,
}) => {
  const defaultStyle: CSSProperties = {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
  };

  const backgroundImageStyle: CSSProperties = item?.backgroundImage
    ? {
        backgroundImage: `url('${item.backgroundImage}')`,
        width: 50,
        height: 50,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : defaultStyle;

  return (
    <div className={styles.container}>
      <div style={backgroundImageStyle}></div>
      <div>
        <div>{item?.artistName || 'Unknown Artist'}</div>
        <div>{item?.name || 'Unknown Album'}</div>
      </div>
    </div>
  );
};

export default HitsItemDisplay;
