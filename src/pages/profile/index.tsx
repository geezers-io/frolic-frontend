import { useEffect } from 'react';

import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { PostsService, UserService } from 'api/services';
import EmptySpace from 'components/empty/EmptySpace';
import PostCard from 'components/post/postCard/PostCard';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';
import { handleErrorByAntdMessage } from 'utils/handler';

const Profile = () => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const [userProfileInfo, setUserProfileInfo] = useRecoilState(atomStore.userProfileInfo);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    PostsService.getUserPosts({ page: 0, size: 99999 })
      .then((data) => setPosts(data))
      .catch((err) => messageApi.error(err.message));
    UserService.getMe()
      .then((userProfileInfo) => setUserProfileInfo(userProfileInfo))
      .catch(handleErrorByAntdMessage);
  }, [setUserProfileInfo, setPosts, messageApi]);

  if (!userProfileInfo) {
    return null;
  }
  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton />

      <UserPanel userProfileInfo={userProfileInfo} />

      <EmptySpace />

      {posts?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </AppLayout>
  );
};

export default Profile;
