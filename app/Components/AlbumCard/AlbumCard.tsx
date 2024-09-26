import Image from 'next/image';
import Link from 'next/link';
import { TextHtmlTypeEnum } from '../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Text/enums/text-type.enum';
import styles from './AlbumCard.module.scss';
import { AlbumCardPropsInterface } from './interfaces/album-card-props.interface';
import { AlbumCardType } from './types/albumcard.type';
import Text from '@/app/Components/Text/Text';

const AlbumCard: AlbumCardType = (props: AlbumCardPropsInterface) => {
  return (
    <Link href={`/albums/${props.id}`}>
      <div className={`${styles.albumCard} ${styles.dark}`}>
        <div className={styles.albumCardImage}>
          <Image
            src={props.image}
            alt={props.albumName}
            width={184}
            height={146}
          />
        </div>
        <div className={styles.namesContainer}>
          <div className={styles.artistName}>
            <Text
              className={styles.artistNameFont}
              htmlType={TextHtmlTypeEnum.Span}
              type={TextTypeEnum.PrimaryTextLarge}
            >
              {props.title}
            </Text>
          </div>
          <Text
            htmlType={TextHtmlTypeEnum.Span}
            type={TextTypeEnum.SecondaryTextMedium}
            className={`${styles.albumName} ${styles.albumNameFont}`}
            color={{
              lightColor: '#B1B1B1',
              darkColor: '#B1B1B1',
            }}
          >
            {props.albumName}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
