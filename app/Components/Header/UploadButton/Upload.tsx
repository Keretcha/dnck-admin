'use client';
import { usePathname } from 'next/navigation';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import Dropdown from '../../Dropdown/Dropdown';
// import { DropdownButtonPropsInterface } from '../../Dropdown/DropdownButton/interfaces/dropdown-button-props.interface';
import { DropDownPositionEnum } from '../../Dropdown/enums/dropdown-position.enum';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import styles from './Upload.module.scss';
import { DropDownItems } from './dropDownItems/dropDownItems';

const Upload = (): JSX.Element => {
  const pathName: string = usePathname();
  const isActive: boolean = pathName === '/';
  return (
    <div className={isActive ? styles.active : styles.hidden}>
      <Button type={ButtonTypeEnum.Primary}>
        <span>Upload</span>
        <Dropdown
          icon={<Icon name={IconNameEnum.ArrowDown} width={24} height={24} />}
          position={DropDownPositionEnum.Left}
          items={DropDownItems}
        />
      </Button>
    </div>
  );
};

export default Upload;
