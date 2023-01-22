import React from 'react';

import Header from 'components/header/Header';

interface Props {
  title?: string;
  children: React.ReactNode;
  hideHeaderProfileIcon?: boolean;
  hideHeaderSearchIcon?: boolean;
}

const AuthLayout: React.FC<Props> = ({ title, children, hideHeaderProfileIcon, hideHeaderSearchIcon }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header hideSearchIcon={hideHeaderSearchIcon} hideProfileIcon={hideHeaderProfileIcon} />

    <div className="h-full flex flex-col justify-center px-2">
      <main className="bg-white rounded-md px-4 py-6 shadow-lg">
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
