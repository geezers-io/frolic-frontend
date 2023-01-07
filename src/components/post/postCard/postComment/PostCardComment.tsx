import React, { memo } from 'react';

import { Typography } from 'antd';
import { useRecoilValue } from 'recoil';

import { Comment } from 'api/@types/comments';
import PostCommentsDropdown from 'components/post/postCard/postComment/PostCommentsDropdown';
import UserIcon from 'components/userPanel/UserIcon';
import { meAtom } from 'stores/atom/user';

const { Text } = Typography;

interface Props {
  comment: Comment;
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const PostCardComment: React.FC<Props> = ({ comment, postId, setComments }) => {
  const me = useRecoilValue(meAtom);

  return (
    <div className="flex items-center gap-x-3 justify-between mb-2">
      <div className="flex gap-x-2 items-center">
        <div className="flex gap-x-1 items-center">
          <UserIcon realname={comment.userInfo.realname} username={comment.userInfo.username} />
          <Text className="text-bold font-bold ml-0.5">{comment.userInfo.realname}</Text>
        </div>
        <Text>{comment.textContent}</Text>
      </div>

      {me?.userInfo.id === comment.userInfo.id && (
        <PostCommentsDropdown
          postId={postId}
          commentId={comment.id}
          postOwnerId={comment.userInfo.id}
          setComments={setComments}
        />
      )}
    </div>
  );
};

export default memo(PostCardComment);
