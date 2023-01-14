import React from 'react';

import Header from 'components/header/Header';

interface Props {
  children: React.ReactNode;
  hideHeaderProfileIcon?: boolean;
  hideHeaderSearchIcon?: boolean;
}

const AuthLayout: React.FC<Props> = ({ children, hideHeaderProfileIcon, hideHeaderSearchIcon }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header hideSearchIcon={hideHeaderSearchIcon} hideProfileIcon={hideHeaderProfileIcon} />
    <main className="h-full flex items-center px-5">{children}</main>
  </div>
);

export default AuthLayout;
