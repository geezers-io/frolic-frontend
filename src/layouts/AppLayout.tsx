import React from 'react';

import Header from 'components/header/Header';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] relative">
    <Header />
    <main className="h-full overflow-y-scroll">{children}</main>
  </div>
);

export default AppLayout;
