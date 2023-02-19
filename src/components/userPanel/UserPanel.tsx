import React from 'react';

import { CalendarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';

import { UserDetail } from 'api/@types/user';
import FollowersModal from 'components/follower/FollowersModal';
import FollowingsModal from 'components/following/FollowingsModal';
import FollowOrUnFollowButton from 'components/userPanel/FollowOrUnFollowButton';
import { useModal } from 'hooks/useModal';
import atomStore from 'stores/atom';
import { days } from 'utils/days';

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
          <section className="flex flex-col gap-2 mt-2">
            <section>
              <p className="text-xl font-semibold text-gray-700 mb-0">{userInfo.realname}</p>
              <p className="text-gray-600 mb-0">@{userInfo.username}</p>
            </section>
            <section>
              <section className="text-sm text-gray-700 align-middle">
                <CalendarOutlined />
                <span className="ml-1">가입일: {days(userInfo.createdDate).format('YYYY년 MM월')}</span>
              </section>
              <section className="flex gap-2">
                <Button
                  type="text"
                  size="small"
                  className="flex align-middle leading-normal p-0 h-fit"
                  onClick={!!allFollowingCount ? openFollowingModal : undefined}
                >
                  <span className="text-sm text-center font-bold mr-1 align-middle">{allFollowingCount}</span>
                  <span className="text-sm text-gray-700 align-middle">팔로우 중</span>
                </Button>
                <Button
                  type="text"
                  size="small"
                  className="flex align-middle leading-normal p-0 h-fit"
                  onClick={!!allFollowerCount ? openFollowModal : undefined}
                >
                  <span className="text-sm text-center font-bold mr-1 align-middle">{allFollowerCount}</span>
                  <span className="text-sm text-gray-700 align-middle">팔로워</span>
                </Button>
              </section>
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
