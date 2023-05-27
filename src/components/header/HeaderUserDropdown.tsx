import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useResetRecoilState } from 'recoil';

import { AuthService } from 'api/services';
import atomStore from 'stores/atom';
import { token } from 'utils/token';

interface Props {
  isLogined: boolean;
}

const enum MenuKey {
  Profile,
  SignOut,
}

const menuItems: ItemType[] = [
  {
    label: '프로필',
    key: MenuKey.Profile,
  },
  { type: 'divider' },
  {
    label: '로그아웃',
    key: MenuKey.SignOut,
  },
];

const HeaderUserDropdown: React.FC<Props> = ({ isLogined }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const resetMe = useResetRecoilState(atomStore.meAtom);

  const moveToSignInPage = useCallback(() => {
    router.push('/auth/sign-in');
  }, [router]);

  const handleDropDownClick: Required<MenuProps>['onClick'] = async ({ key }) => {
    try {
      switch (Number(key)) {
        case MenuKey.Profile: {
          router.push('/profile');
          return;
        }
        case MenuKey.SignOut: {
          await AuthService.logout();
          resetMe();
          token.clear();
          moveToSignInPage();
          return;
        }
        default: {
          return;
        }
      }
    } catch (e) {
      messageApi.error(e.message);
    }
  };

  if (!isLogined) {
    return (
      <Button className="no-padding" shape="circle" icon={<UserOutlined color="black" />} onClick={moveToSignInPage} />
    );
  }

  return (
    <>
      {contextHolder}

      <Dropdown menu={{ items: menuItems, onClick: handleDropDownClick }}>
        <Button className="no-padding" shape="circle" icon={<UserOutlined color="black" />} />
      </Dropdown>
    </>
  );
};

export default HeaderUserDropdown;
