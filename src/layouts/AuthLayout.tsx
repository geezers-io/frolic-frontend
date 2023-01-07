import Header from 'components/header/Header';

const AuthLayout = ({ hideHeaderProfileIcon, hideHeaderSearchIcon, children }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header hideSearchIcon={hideHeaderSearchIcon} hideProfileIcon={hideHeaderProfileIcon} />
    <main className="h-full flex items-center px-5">{children}</main>
  </div>
);

AuthLayout.propTypes = {
  hideHeaderProfileIcon: PropTypes.bool,
  hideHeaderSearchIcon: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
