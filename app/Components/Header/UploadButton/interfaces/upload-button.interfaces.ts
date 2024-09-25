import { IconNameEnum } from '@/app/Components/Icon/enums/icon-name.enum';
import { ReactNode } from 'react';

export interface UploadButtonInterfaces {
  children: ReactNode;
  href: string;
  icon: IconNameEnum;
}
