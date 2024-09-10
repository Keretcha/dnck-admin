import Link from 'next/link';
import Text from '../Text/Text';
import { TextHtmlTypeEnum } from '../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Text/enums/text-type.enum';
import styles from './HitsCard.module.scss';
import { HitsCardItemsInterface } from './interfaces/hits-card-items.interface';
import { HitsCardType } from './type/hits-card.type';

const HitsCard: HitsCardType = (props: HitsCardItemsInterface) => {
  return (
    <Link href={'/'}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={styles.hitsCardsImage}
            style={{
              backgroundImage: props.backgroundImage,
              backgroundRepeat: `no-repeat`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className={styles.title}>
            <Text
              className={styles.artistName}
              htmlType={TextHtmlTypeEnum.Span}
              type={TextTypeEnum.SecondaryTextMedium}
            >
              {props.artistName}
            </Text>
            <Text
              className={styles.albumName}
              htmlType={TextHtmlTypeEnum.Span}
              type={TextTypeEnum.SecondaryTextMedium}
            >
              {props.albumName}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HitsCard;
