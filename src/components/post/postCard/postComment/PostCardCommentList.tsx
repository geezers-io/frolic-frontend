import React, { useCallback, useState } from 'react';

import { Typography } from 'antd';
import shortid from 'shortid';

import { Comment } from 'api/@types/comments';
import PostCardComment from 'components/post/postCard/postComment/PostCardComment';

const { Text } = Typography;

interface Props {
  comments: Comment[];
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const PostCardCommentList: React.FC<Props> = ({ comments, postId, setComments }) => {
  const [isExpand, setIsExpand] = useState(false);
  const displayComments = isExpand ? comments : [comments[0]].filter(Boolean);

  const onClickHandleExpand = useCallback(() => {
    setIsExpand((prev) => !prev);
  }, []);

  if (comments.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col justify-center p-3">
      {displayComments?.map((comment) => (
        <div key={shortid.generate()}>
          <PostCardComment key={shortid.generate()} comment={comment} postId={postId} setComments={setComments} />
        </div>
      ))}

      <Text key={shortid.generate()} className="text-sky-500 cursor-pointer w-fit" onClick={onClickHandleExpand}>
        {isExpand ? '댓글 닫기' : '댓글 더보기'}
      </Text>
    </section>
  );
};

export default PostCardCommentList;
