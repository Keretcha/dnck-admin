'use client';

import { useState, useRef, RefObject, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import DropdownContainer from './DropdownContainer/DropdownContainer';
import { DropdownPropsInterface } from './interfaces/dropdown-props.interface';
import { DropdownType } from './types/dropdown.type';

const Dropdown: DropdownType = (props: DropdownPropsInterface) => {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const onClick = (): void => {
    setShow(!show);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.wrapper}`} ref={dropdownRef}>
      <div
        className={`${styles.dropdown} ${styles.dropDownDark}`}
        onClick={onClick}
      >
        {props.icon}
      </div>
      <div
        className={`${styles.dropdownContainer} ${show ? styles.visible : ''}  ${styles[props.position]}`}
      >
        <DropdownContainer items={props.items} />
      </div>
    </div>
  );
};
export default Dropdown;
