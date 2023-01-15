import React, { useCallback, useEffect, useState } from 'react';

import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import { Comment } from 'api/@types/comments';
import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import PostCardCommentBox from 'components/post/postCard/postComment/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/postComment/PostCardCommentList';

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
  const [postComments, setPostComments] = useState<Comment[]>([]);
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

  useEffect(() => {
    setPostComments(post.comments);
  }, [post.comments]);

  return (
    <>
      {contextHolder}
      <footer className="grid grid-cols-2 mt-5">
        <Button type="text" className="border-0 bg-transparent text-gray-600" onClick={handleClickCommentBox}>
          <CommentOutlined className="text-xl" />
          <span>{post.comments.length}</span>
        </Button>
        <Button
          type="text"
          className={`border-0 bg-transparent ${likedButtonState.color}`}
          onClick={handleClickLikeBox}
        >
          <LikeOutlined className="text-xl" />
          <span>{likedButtonState.likeCount}</span>
        </Button>
      </footer>

      <PostCardCommentBox postId={post.id} setComments={setPostComments} open={isOpenCommentBox} />
      <PostCardCommentList postId={post.id} setComments={setPostComments} comments={postComments} />
    </>
  );
};

export default PostCardFooter;
