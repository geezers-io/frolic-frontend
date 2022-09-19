import PropTypes from 'prop-types';

export const AppLayout = ({ children }) => (
  <main className="w-full h-full md:w-[500px] bg-[#F0F2F5]">
    { children }
  </main>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
