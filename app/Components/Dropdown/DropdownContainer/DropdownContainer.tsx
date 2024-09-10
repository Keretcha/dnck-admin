import DropdownButton from '../DropdownButton/DropdownButton';
import styles from './DropdownContainer.module.scss';
import { DropdownContainerPropsInterface } from './interfaces/dropdown-container.props.interface';
import { DropdownContainerType } from './types/dropdown-container.type';

const DropdownContainer: DropdownContainerType = (
  props: DropdownContainerPropsInterface,
) => {
  const classNames: string[] = [styles.dropdownButtonContainer];

  return (
    <div className={classNames.join(' ').trim()}>
      {props.items.map((item) => (
        <DropdownButton
          icon={item.icon}
          onClick={item.onClick}
          key={item.title}
          width={0}
          height={0}
          href={item.href}
        >
          {item.title}
        </DropdownButton>
      ))}
    </div>
  );
};

export default DropdownContainer;
