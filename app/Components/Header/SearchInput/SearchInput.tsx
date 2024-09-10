import Link from 'next/link';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Input from '../../Input/Input';
import { InputIconPositionEnum } from '../../Input/enum/input-icon-position.enum';
import { InputTypeEnum } from '../../Input/enum/input-type.enum';
import styles from './SearchInput.module.scss';

const SearchInput = (): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.arrow}>
        <Link href={'/'}>
          <Icon name={IconNameEnum.ArrowLeft} width={40} height={40} />
        </Link>
        <Link href={'/'}>
          <Icon name={IconNameEnum.ArrowRight} width={40} height={40} />
        </Link>
      </div>
      <div className={styles.searching}>
        <Input
          type={InputTypeEnum.Text}
          placeholder={'Search'}
          icon={<Icon name={IconNameEnum.Search} width={24} height={24} />}
          iconPosition={InputIconPositionEnum.Left}
          isDark={false}
        />
      </div>
    </div>
  );
};

export default SearchInput;
