'use client';
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface RecoilWrapperProps {
  children: ReactNode;
}

const RecoilWrapper: React.FC<RecoilWrapperProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
