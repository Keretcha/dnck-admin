import { RecoilState, atom } from 'recoil';

export const isDarkState: RecoilState<boolean> = atom({
  key: 'isDark',
  default: false,
});

export const isShowState: RecoilState<boolean> = atom({
  key: 'show',
  default: false,
});
