import React, { useCallback, useEffect, useState } from 'react';

import { message, Modal } from 'antd';
import { useRecoilValue } from 'recoil';

import { UserSimple } from 'api/@types/user';
import { UserService } from 'api/services';
import Following from 'components/following/Following';
import atomStore from 'stores/atom';

interface Props {
  isShow: boolean;
  handleClose: () => void;
}

const FollowingsModal: React.FC<Props> = ({ isShow, handleClose }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [followings, setFollowings] = useState<UserSimple[]>([]);

  const getFollowings = useCallback(async () => {
    if (!me) return;

    try {
      const followings = await UserService.getFollowingsByUsername({ username: me.userInfo.username });
      setFollowings(followings);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [me, messageApi]);

  useEffect(() => {
    getFollowings().then();
  }, [isShow, getFollowings]);

  return (
    <>
      {contextHolder}

      <Modal title="팔로잉 현황" open={isShow} onOk={handleClose} onCancel={handleClose}>
        {followings.map(({ username, realname }) => (
          <Following username={username} realname={realname} key={'following-' + username} />
        ))}
      </Modal>
    </>
  );
};

export default FollowingsModal;
