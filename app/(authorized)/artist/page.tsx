'use client';
import styles from './artist.module.scss';
import Heading from '@/app/Components/Heading/Heading';
import { HeadingTypeEnum } from '@/app/Components/Heading/enums/heading-type.enum';
import ArtistControlTable from '@/app/Components/Tables/artists/artistControl';
import Text from '@/app/Components/Text/Text';
import { TextHtmlTypeEnum } from '@/app/Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '@/app/Components/Text/enums/text-type.enum';

export default function Artist(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Heading type={HeadingTypeEnum.H3}>Added Artists</Heading>
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.SecondaryTextSmall}
          className={styles.headerText}
        >
          90 Artist
        </Text>
      </div>
      <div>
        <ArtistControlTable />
      </div>
    </div>
  );
}
