export interface ModalPropsInterface {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: (a: boolean) => void;
}
