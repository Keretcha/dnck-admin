import Link from 'next/link';
import Heading from '../Heading/Heading';
import { HeadingTypeEnum } from '../Heading/enums/heading-type.enum';
import Text from '../Text/Text';
import { TextHtmlTypeEnum } from '../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Text/enums/text-type.enum';
import styles from './ContentHeading.module.scss';
import { ContentHeadingPropsInterface } from './interfaces/content-heading-props.interface';
import { ContentHeadingType } from './types/content-heading.type';

const ContentHeading: ContentHeadingType = (
  props: ContentHeadingPropsInterface,
) => {
  return (
    <div className={styles.container}>
      <Heading type={HeadingTypeEnum.H5}>{props.children}</Heading>
      <Link href={'/playlist'}>
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.SecondaryTextMediumBold}
          className={styles.more}
        >
          See all
        </Text>
      </Link>
    </div>
  );
};

export default ContentHeading;
