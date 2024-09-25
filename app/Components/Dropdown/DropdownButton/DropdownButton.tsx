import Link from 'next/link';
import Icon from '../../Icon/Icon';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import styles from './DropDownButton.module.scss';
import { DropdownButtonPropsInterface } from './interfaces/dropdown-button-props.interface';
import { DropdownButtonType } from './types/dropdown-button.type';
import Text from '@/app/Components/Text/Text';

const DropdownButton: DropdownButtonType = (
  props: DropdownButtonPropsInterface,
) => {
  return (
    <Link href={props.href}>
      <div className={styles.button}>
        <Icon name={props.icon} width={24} height={24} />
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.SecondaryTextMediumBold}
          color={{
            lightColor: '#9d9d9d',
            darkColor: '#9d9d9d',
          }}
        >
          {props.children}
        </Text>
      </div>
    </Link>
  );
};

export default DropdownButton;
