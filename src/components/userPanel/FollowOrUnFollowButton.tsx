import React, { useEffect, useState } from 'react';

import { Button, message } from 'antd';

import { UserService } from 'api/services';

interface Props {
  username: string;
}

const FollowOrUnFollowButton: React.FC<Props> = ({ username }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isFollowing, setIsFollowing] = useState<boolean>(true);

  const checkAndSetIsFollowing = async () => {
    try {
      const isFollowing = await UserService.checkFollow({ username });
      setIsFollowing(isFollowing);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const onClickFollowUser = async () => {
    try {
      if (isFollowing) {
        await UserService.unFollow({ username });
      } else {
        await UserService.follow({ username });
      }

      setIsFollowing((prev) => !prev);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  useEffect(() => {
    checkAndSetIsFollowing();
  }, []);

  return (
    <>
      {contextHolder}

      <Button className="mt-1.5" onClick={onClickFollowUser}>
        {isFollowing ? '팔로우 취소' : '팔로우'}
      </Button>
    </>
  );
};

export default FollowOrUnFollowButton;
