import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { message } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';

import { UserService } from 'api/services';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import TargetFollowButton from 'components/userPanel/TargetFollowButton';
import UserPanel from 'components/userPanel/UserPanel';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const Username = () => {
  const router = useRouter();
  const username = (router.query.username ?? '') as string;
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [userProfileInfo, setUserProfileInfo] = useRecoilState(atomStore.userProfileInfo);
  const [user, setUser] = useRecoilState(atomStore.userInfoByUsernameAtom);

  useEffect(() => {
    if (user && me) {
      const isMe = user.userInfo.userId === me.userId;

      if (isMe) {
        router.push('/profile');
      }
    }
  }, [user, me, router]);

  useEffect(() => {
    setUserProfileInfo(user);
  }, [setUserProfileInfo, user]);

  useDidMountEffect(async () => {
    try {
      const user = await UserService.getUser({ username });
      setUser(user);
    } catch (e) {
      messageApi.error(e.message);
    }
  });

  if (!user || !userProfileInfo) return null;

  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton />

      <UserPanel followComponent={<TargetFollowButton username={username as string} />} />
    </AppLayout>
  );
};

export default Username;
