import React, { CSSProperties } from 'react';

import { UserOutlined } from '@ant-design/icons';

import { invertColor } from 'utils/invertColor';
import { isAlphabet } from 'utils/isAlphabet';

interface Props {
  username: string;
  realname: string;
  size?: 's' | 'm' | 'l';
  style?: CSSProperties;
}

const getProfileColor = (char: string) => {
  if (!isAlphabet(char)) {
    return {
      color: invertColor('#89CFF0'),
      backgroundColor: '#89CFF0',
    };
  }

  const ascii = char.charCodeAt(0);
  const doubleDigit = ascii - 23; // 'z' is 122

  const backgroundColor = `#${Math.floor((doubleDigit / 100) * 16777215).toString(16)}`;
  const color = invertColor(backgroundColor);

  return { color, backgroundColor };
};

const sizeClassNamesDict = {
  s: 'text-lg w-8 h-8',
  m: 'text-2xl w-10 h-10',
  l: 'text-5xl w-20 h-20',
};

const UserIcon: React.FC<Props> = ({ username, realname, size = 's', style }) => {
  const sizeClassNames = sizeClassNamesDict[size] ?? '';
  const firstAlphabetOfUsername = username?.match(/[a-zA-Z]/)?.[0] ?? '';
  const { color, backgroundColor } = getProfileColor(firstAlphabetOfUsername);
  const firstCharOfRealname = realname?.match(/[a-zA-Z가-힣ㄱ-ㅎ]/)?.[0] ?? '';

  return (
    <div
      className={`rounded-full flex justify-center items-center ${sizeClassNames}`}
      style={{
        ...style,
        color,
        backgroundColor,
      }}
    >
      {!realname ? <UserOutlined /> : <span>{firstCharOfRealname.toUpperCase()}</span>}
    </div>
  );
};

export default UserIcon;
