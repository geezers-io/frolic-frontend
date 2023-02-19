import React, { CSSProperties } from 'react';

import { UserOutlined } from '@ant-design/icons';

import { convertAlphabetToColor } from 'utils/convertAlphabetToColor';

interface Props {
  username: string;
  realname: string;
  size?: 's' | 'm' | 'l';
  style?: CSSProperties;
}

const sizeClassNamesDict = {
  s: 'text-lg w-8 h-8',
  m: 'text-2xl w-10 h-10',
  l: 'text-5xl w-20 h-20',
};

const UserIcon: React.FC<Props> = ({ username, realname, size = 's', style }) => {
  const sizeClassNames = sizeClassNamesDict[size] ?? '';
  const firstAlphabetOfUsername = username?.match(/[a-zA-Z]/)?.[0] ?? '';
  const firstCharOfRealname = realname?.match(/[a-zA-Z가-힣ㄱ-ㅎ]/)?.[0] ?? '';

  return (
    <div
      className={`rounded-full flex justify-center items-center ${sizeClassNames}`}
      style={{
        ...style,
        color: '#FFFFFF',
        backgroundColor: convertAlphabetToColor(firstAlphabetOfUsername),
      }}
    >
      {!realname ? <UserOutlined /> : <span>{firstCharOfRealname.toUpperCase()}</span>}
    </div>
  );
};

export default UserIcon;
