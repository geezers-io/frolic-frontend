import React from 'react';

import { useRecoilValue } from 'recoil';

import { UserDetail } from 'api/@types/user';
import FollowersModal from 'components/follower/FollowersModal';
import FollowingsModal from 'components/following/FollowingsModal';
import FollowOrUnFollowButton from 'components/userPanel/FollowOrUnFollowButton';
import { useModal } from 'hooks/useModal';
import atomStore from 'stores/atom';

import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

interface Props {
  user: UserDetail;
}

const UserPanel: React.FC<Props> = ({ user: { userInfo, allFollowingCount, allFollowerCount } }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const isMe = me?.userInfo.username === userInfo.username;
  const { isModalOpen: isFollowModalOpen, openModal: openFollowModal, closeModal: closeFollowModal } = useModal();
  const {
    isModalOpen: isFollowingModalOpen,
    openModal: openFollowingModal,
    closeModal: closeFollowingModal,
  } = useModal();

  return (
    <>
      <section className="relative pt-[5.5rem]">
        <section className="absolute top-0 bg-gray-300 w-full h-32"></section>
        <article className="relative px-5">
          <section className="flex justify-between items-end">
            <UserIcon size="l" username={userInfo.username} realname={userInfo.realname} />
            <UserConfigDropdown />
          </section>
          <section>
            <section className="my-2">
              <p className="text-xl font-semibold text-gray-700 mb-0">{userInfo.realname}</p>
              <p className="text-gray-600 mb-0">@{userInfo.username}</p>
            </section>
            {/*<section>*/}
            {/*  <CalendarOutlined />*/}
            {/*  <span>가입일 {userInfo.createAt}</span>*/}
            {/*</section>*/}
            <section className="flex gap-2">
              <ProfileStat title="팔로우 중" count={allFollowingCount} onClick={openFollowingModal} />
              <ProfileStat title="팔로워" count={allFollowerCount} onClick={openFollowModal} />
            </section>

            {me && !isMe && <FollowOrUnFollowButton username={userInfo.username as string} />}
          </section>
        </article>
      </section>

      <FollowersModal handleClose={closeFollowModal} isShow={isFollowModalOpen} />
      <FollowingsModal handleClose={closeFollowingModal} isShow={isFollowingModalOpen} />
    </>
  );
};

export default UserPanel;
