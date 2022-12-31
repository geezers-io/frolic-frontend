import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderUserDropdown from 'components/header/HeaderUserDropdown';
import { token } from 'utils';
import HeaderSearch from './HeaderSearch';

const Header = ({ hideProfileIcon, hideSearchIcon }) => {
  return (
    <header className="flex h-12 bg-white justify-between px-4 items-center font-semibold relative">
      <h1 className="m-0 text-lg text-slate-600 whitespace-nowrap">
        <Link to="/">Frolic</Link>
      </h1>

      <nav className="flex gap-x-2">
        {!hideSearchIcon && <HeaderSearch />}
        {!hideProfileIcon && (
          <HeaderUserDropdown
            isUser={!!token.accessToken.get() /* TODO: 스토어 내 유저 정보 여부에 따라 분기하도록 변경 */}
          />
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  hideProfileIcon: PropTypes.bool,
  hideSearchIcon: PropTypes.bool,
};

export default Header;
