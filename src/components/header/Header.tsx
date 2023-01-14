import Link from 'next/link';
import React from 'react';

import { useRecoilValue } from 'recoil';

import HeaderUserDropdown from 'components/header/HeaderUserDropdown';
import atomStore from 'stores/atom';

import HeaderSearch from './HeaderSearch';

interface Props {
  hideProfileIcon?: boolean;
  hideSearchIcon?: boolean;
}

const Header: React.FC<Props> = ({ hideProfileIcon, hideSearchIcon }) => {
  const me = useRecoilValue(atomStore.meAtom);

  return (
    <header className="flex h-12 bg-white justify-between px-4 items-center font-semibold relative">
      <h1 className="m-0 text-lg text-slate-600 whitespace-nowrap">
        <Link href="/">Frolic</Link>
      </h1>

      <nav className="flex gap-x-2">
        {!hideSearchIcon && <HeaderSearch />}
        {!hideProfileIcon && <HeaderUserDropdown isLogined={!!me} />}
      </nav>
    </header>
  );
};

export default Header;
