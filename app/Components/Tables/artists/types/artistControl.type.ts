import { TablePropsItems } from '../../interfaces/tables-props.interface';

export type TableItemsType = (props: {
  items: TablePropsItems[];
}) => JSX.Element;
