import React from 'react';

import { Button, ButtonProps } from 'antd';

interface Props {
  title: string;
  count: number;
  onClick: ButtonProps['onClick'];
}

const ProfileStat: React.FC<Props> = ({ title, count, onClick }) => {
  return (
    <Button type="text" size="small" className="flex align-middle leading-normal p-0 mr-1" onClick={onClick}>
      <span className="text-sm text-center font-bold mr-1 align-middle">{count}</span>
      <span className="text-sm text-gray-700 align-middle">{title}</span>
    </Button>
  );
};

export default ProfileStat;
