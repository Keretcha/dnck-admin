import { ReactNode } from 'react';
import { IconNameEnum } from '@/app/Components/Icon/enums/icon-name.enum';

export interface UploadButtonInterfaces {
  children: ReactNode;
  href: string;
  icon: IconNameEnum;
}
