import styles from './Heading.module.scss';
import { HeadingTypeEnum } from './enums/heading-type.enum';
import { HeadingPropsInterface } from './interfaces/heading-props.interface';
import { HeadingType } from './types/heading.type';

const Heading: HeadingType = (props: HeadingPropsInterface) => {
  const Type: HeadingTypeEnum = props.type;
  const className: string = `${props.type}`;
  return <Type className={styles[className]}>{props.children}</Type>;
};

export default Heading;
