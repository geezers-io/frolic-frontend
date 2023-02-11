import React, { useCallback, useEffect, useState } from 'react';

import { message, Modal } from 'antd';
import { useRecoilValue } from 'recoil';

import { UserSimple } from 'api/@types/user';
import { UserService } from 'api/services';
import Follower from 'components/follower/Follower';
import atomStore from 'stores/atom';

interface Props {
  isShow: boolean;
  handleClose: () => void;
}

const FollowersModal: React.FC<Props> = ({ isShow, handleClose }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [followers, setFollowers] = useState<UserSimple[]>([]);

  const getFollowers = useCallback(async () => {
    if (!me) return;

    try {
      const followers = await UserService.getFollowersByUsername({ username: me.userInfo.username });
      setFollowers(followers);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [me, messageApi]);

  useEffect(() => {
    getFollowers().then();
  }, [isShow, getFollowers]);

  return (
    <>
      {contextHolder}

      <Modal title="팔로우 현황" open={isShow} onOk={handleClose} onCancel={handleClose}>
        {followers.map(({ username, realname }) => (
          <Follower username={username} realname={realname} key={'follower-' + username} />
        ))}
      </Modal>
    </>
  );
};

export default FollowersModal;
