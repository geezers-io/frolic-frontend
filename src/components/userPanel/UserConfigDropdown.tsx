import { useRouter } from 'next/router';
import React, { CSSProperties, useCallback } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

interface Props {
  style?: CSSProperties;
}

const enum MenuKeys {
  ProfileConfig,
  PasswordConfig,
  DeleteUser,
}

const menuItems: ItemType[] = [
  { label: '프로필 변경', key: MenuKeys.ProfileConfig },
  { type: 'divider' },
  { label: '비밀번호 변경', key: MenuKeys.PasswordConfig },
  { type: 'divider' },
  { label: '계정 삭제', key: MenuKeys.DeleteUser, danger: true },
];

const UserConfigDropdown: React.FC<Props> = ({ style }) => {
  const router = useRouter();

  const onProfileSettingClicked = useCallback<Required<MenuProps>['onClick']>(
    ({ key }) => {
      switch (Number(key)) {
        case MenuKeys.ProfileConfig: {
          router.push('/profile/user-config');
          return;
        }

        case MenuKeys.PasswordConfig: {
          router.push('/profile/password-config');
          return;
        }

        case MenuKeys.DeleteUser: {
          router.push('/profile/user-delete');
          return;
        }

        default:
          return;
      }
    },
    [router]
  );

  return (
    <Dropdown menu={{ items: menuItems, onClick: onProfileSettingClicked }}>
      <Button
        type="text"
        icon={<SettingOutlined className="text-2xl text-gray-600" />}
        size="large"
        style={{
          width: 30,
          height: 30,
          ...style,
        }}
      />
    </Dropdown>
  );
};

export default UserConfigDropdown;
