import styles from './Errors.module.scss';
import { ErrorsPropsInterfaces } from './interfaces/errors-props.interfaces';

const Errors = (props: ErrorsPropsInterfaces): JSX.Element => {
  return (
    <div>
      <span className={styles.textColor}>{props.title}</span>
    </div>
  );
};

export default Errors;
