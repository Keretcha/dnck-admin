import styles from './Input.module.scss';
import { InputIconPositionEnum } from './enum/input-icon-position.enum';
import { InputPropsInterface } from './interfaces/input-props.interface';
import { InputType } from './types/input.type';

const Input: InputType = (props: InputPropsInterface) => {
  const iconPosition: InputIconPositionEnum =
    props.iconPosition || InputIconPositionEnum.Left;

  return (
    <div className={styles.inputWrapper}>
      {iconPosition === InputIconPositionEnum.Left && props.icon}
      <input
        className={`${styles.input} ${styles.dark} `}
        placeholder={props.placeholder}
        type={props.type}
      />
      {iconPosition === InputIconPositionEnum.Right && props.icon}
    </div>
  );
};

export default Input;
