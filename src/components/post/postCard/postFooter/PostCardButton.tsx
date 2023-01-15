import React from 'react';

import { Button, ButtonProps } from 'antd';

interface Props {
  children: React.ReactNode;
  onClick: ButtonProps['onClick'];
  type: ButtonProps['type'];
}

const PostCardButton: React.FC<Props> = ({ children, onClick, type = 'text' }) => (
  <Button className="p-2 w-full flex-center" onClick={onClick} type={type}>
    {children}
  </Button>
);

export default PostCardButton;
