import styles from './Text.module.scss';
import { TextHtmlTypeEnum } from './enums/text-html-type.enum';
import { PrimaryTextPropsInterface } from './interfaces/text-props.interface';
import { TextType } from './types/text.type';

const Text: TextType = (props: PrimaryTextPropsInterface) => {
  const Type: TextHtmlTypeEnum = props.htmlType;
  const color: string | undefined = props.isDark
    ? props?.color?.darkColor
    : props?.color?.lightColor;
  const className: string[] = [styles[props.type]];
  if (props.className) className.push(props.className);

  return (
    <Type style={{ color }} className={className.join(' ').trim()}>
      {props.children}
    </Type>
  );
};

export default Text;
