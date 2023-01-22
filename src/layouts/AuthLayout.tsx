import Link from 'next/link';
import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import Header from 'components/header/Header';

interface Props {
  children: React.ReactNode;
  title?: string;
  goBackLink?: string;
  hideHeaderProfileIcon?: boolean;
  hideHeaderSearchIcon?: boolean;
}

const AuthLayout: React.FC<Props> = ({ children, title, goBackLink, hideHeaderProfileIcon, hideHeaderSearchIcon }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header hideSearchIcon={hideHeaderSearchIcon} hideProfileIcon={hideHeaderProfileIcon} />

    <div className="h-full flex flex-col justify-center px-2">
      <main className="relative bg-white rounded-md px-4 py-6 shadow-lg">
        {goBackLink && (
          <Link href={goBackLink} className="absolute left-1 top-3">
            <Button size="large" type="ghost" icon={<ArrowLeftOutlined size={24} />} />
          </Link>
        )}
        {title && (
          <header className="mb-8">
            <h1 className="text-xl text-center">{title}</h1>
          </header>
        )}
        {children}
      </main>
    </div>
  </div>
);

export default AuthLayout;
