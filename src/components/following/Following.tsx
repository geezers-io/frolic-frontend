import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Button, message } from 'antd';
import { useRecoilValue } from 'recoil';

import { UsersService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';
import atomStore from 'stores/atom';

interface Props {
  username: string;
  realname: string;
}

const Following: React.FC<Props> = ({ username, realname }) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const me = useRecoilValue(atomStore.meAtom);
  const isMe = me?.userInfo.username === username;
  const [messageApi, contextHolder] = message.useMessage();

  const toggleFollowing = async () => {
    try {
      if (isFollowing) {
        await UsersService.unFollow({ username });
      } else {
        await UsersService.follow({ username });
      }

      setIsFollowing((prev) => !prev);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const onClickUserInfo = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <li className="w-full flex justify-between">
      {contextHolder}

      <Button type="text" onClick={onClickUserInfo} className="flex items-center gap-1 p-0 h-fit">
        <UserIcon username={username} realname={realname} />

        <div className="flex flex-col">
          <span className="ml-2.5 font-semibold text-base">@{username}</span>
          <span className="ml-2.5 text-sm text-slate-500 font-light">{realname}</span>
        </div>
      </Button>

      {isFollowing && !isMe && <Button onClick={toggleFollowing}>팔로우 취소</Button>}
      {!isFollowing && !isMe && <Button onClick={toggleFollowing}>{isMe ? '맞팔로우' : '팔로우'}</Button>}
    </li>
  );
};

export default Following;
