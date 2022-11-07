import PropTypes from 'prop-types';
import { Button } from 'antd';

const ArticleButton = ({ children, onClick }) => (
  <Button className="p-2 w-full flex-all" onClick={onClick}>
    {children}
  </Button>
);

ArticleButton.propTypes = {
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ArticleButton;
