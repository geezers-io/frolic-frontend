import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';

import { Post } from 'api/@types/posts';
import Hashtag from 'components/hashtag/Hashtag';
import PostDropdown from 'components/post/postCard/PostDropdown';
import PostCardFooter from 'components/post/postCard/postFooter/PostCardFooter';
import UserIcon from 'components/userPanel/UserIcon';
import atomStore from 'stores/atom';

import PostCardCarousel from './PostCardCarousel';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const {
    userInfo,
    textContent,
    likeCount,
    hashtags,
    comments,
    id,
    createdDate,
    updatedDate,
    prevFileDownloadUrls,
    likeUp,
  } = post;

  const router = useRouter();
  const [postTimeInfo, setPostTimeInfo] = useState('');
  const me = useRecoilValue(atomStore.meAtom);

  const handleUserProfileClicked = useCallback(() => {
    router.push(`/profile/${userInfo.username}`);
  }, [router, userInfo.username]);

  useEffect(() => {
    const postedDate = new Date(createdDate).toLocaleString();
    setPostTimeInfo(createdDate.includes(updatedDate) ? postedDate : postedDate + ' (수정됨)');
  }, [createdDate, updatedDate]);

  return (
    <article
      className="card flex border-gray-200 p-3"
      style={{
        borderTop: '1px solid',
      }}
    >
      <section className="relative mr-3">
        <Button type="text" onClick={handleUserProfileClicked} className="relative p-0 h-fit z-10 no-padding">
          <UserIcon size="m" username={userInfo.username} realname={userInfo.realname} />
        </Button>
        <div
          className="absolute border-gray-400"
          style={{
            borderRight: '0.5px solid',
            left: '50%',
            transform: 'translateX(-50%)',
            height: 'calc(100% - 3.5rem)',
          }}
        >
          <MoreOutlined
            className="absolute text-gray-400"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-48%)',
            }}
          />
        </div>
      </section>

      <section className="flex-1 overflow-x-auto">
        <section>
          <section className="relative flex items-center justify-between">
            <Button type="text" onClick={handleUserProfileClicked} className="flex items-center gap-1 p-0 h-fit">
              <span className="font-semibold">{userInfo.realname}</span>
              <span className="text-gray-500">@{userInfo.username}</span>
            </Button>
            {userInfo.id === me?.userInfo.id && <PostDropdown post={post} />}
          </section>
          <section className="leading-none">
            <span className="text-xs text-gray-400">{postTimeInfo}</span>
          </section>
          <section className="mt-2">
            <span>{textContent}</span>
            {hashtags.map((tag) => (
              <Hashtag key={'postCardHashtag-' + tag} tag={tag} />
            ))}
          </section>
        </section>

        {prevFileDownloadUrls.length !== 0 && (
          <section className="mt-3">
            <PostCardCarousel imageUrls={prevFileDownloadUrls} />
          </section>
        )}

        <PostCardFooter post={post} />
      </section>
    </article>
  );
};

export default PostCard;
