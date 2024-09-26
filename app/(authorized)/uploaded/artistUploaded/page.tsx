import Image from 'next/image';
import Heading from '../../../Components/Heading/Heading';
import { HeadingTypeEnum } from '../../../Components/Heading/enums/heading-type.enum';
import Text from '../../../Components/Text/Text';
import { TextHtmlTypeEnum } from '../../../Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../../Components/Text/enums/text-type.enum';
import styles from './uploaded.module.scss';
import { JSX } from 'react';

const ArtistUploaded = (): JSX.Element => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.done}>
          <Image
            src={'/icons/done.svg'}
            alt={'done'}
            width={148}
            height={148}
          />
          <div className={styles.uploadedText}>
            <Heading type={HeadingTypeEnum.H4}>Artist Uploaded</Heading>
            <Text
              className={styles.uploadText}
              htmlType={TextHtmlTypeEnum.Span}
              type={TextTypeEnum.PrimaryTextLarge}
            >
              Gela Gnolidze Added In Artists
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistUploaded;
