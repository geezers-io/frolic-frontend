import React, { useCallback, useState } from 'react';

import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import PostComments from 'components/post/postCard/PostComments';

interface Props {
  post: Post;
}

const LIKE_COLOR = 'text-pink-600' as const;
const NOT_LIKE_COLOR = 'text-gray-600' as const;

const PostCardFooter: React.FC<Props> = ({ post }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [likedButtonState, setLikedButtonState] = useState({
    isLiked: post.likeUp,
    likeCount: post.likeCount,
    color: post.likeUp ? LIKE_COLOR : NOT_LIKE_COLOR,
  });
  const [commentsLength, setCommentsLength] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickCommentBox = useCallback(() => {
    setIsOpenCommentBox((prev) => !prev);
  }, []);

  const handleClickLikeBox = useCallback(async () => {
    try {
      if (likedButtonState.isLiked) {
        const { count } = await PostsService.unlikePost({ postId: post.id });

        setLikedButtonState(() => ({
          isLiked: false,
          likeCount: count,
          color: NOT_LIKE_COLOR,
        }));
      } else {
        const { count } = await PostsService.likePost({ postId: post.id });

        setLikedButtonState(() => ({
          isLiked: true,
          likeCount: count,
          color: LIKE_COLOR,
        }));
      }
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [likedButtonState.isLiked, messageApi, post.id]);

  return (
    <>
      {contextHolder}

      <footer className="mt-5">
        <section className="grid grid-cols-2">
          <Button type="text" className="border-0 bg-transparent text-gray-600" onClick={handleClickCommentBox}>
            <CommentOutlined className="text-xl" />
            <span>{commentsLength}</span>
          </Button>
          <Button
            type="text"
            className={`border-0 bg-transparent ${likedButtonState.color}`}
            onClick={handleClickLikeBox}
          >
            <LikeOutlined className="text-xl" />
            <span>{likedButtonState.likeCount}</span>
          </Button>
        </section>

        {isOpenCommentBox && <PostComments postId={post.id} setCommentsLength={setCommentsLength} />}
      </footer>
    </>
  );
};

export default PostCardFooter;
