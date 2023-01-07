import React, { useCallback, useEffect, useRef } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';

import { Comment } from 'api/@types/comments';
import { CommentsService } from 'api/services';
import { meAtom } from 'stores/atom/user';

interface Props {
  open: boolean;
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const PostCardCommentBox: React.FC<Props> = ({ open, postId, setComments }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const me = useRecoilValue(meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const onEnterComment = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    async ({ key }) => {
      if (key !== 'Enter') return;
      if (!me) return;

      const commentInput = inputRef.current;
      const comment = commentInput?.value;
      if (!comment || comment.trim() === '') return;

      try {
        const updatedComments = await CommentsService.createComment({
          postId,
          textContent: commentInput.value,
          postOwnerId: me.userInfo.id,
        });
        setComments((prev) => [...prev, updatedComments]);
        commentInput.value = '';
      } catch (err) {
        messageApi.error(err.message);
      }
    },
    [me, postId, setComments, messageApi]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!open) return null;

  return (
    <section className="px-3 pt-3 flex items-center gap-x-1.5">
      {contextHolder}
      <UserOutlined />
      <input
        placeholder="댓글을 입력하세요..."
        className="
          w-full rounded-2xl bg-white shadow-sm py-1 px-4
          border border-gray-200
        "
        ref={inputRef}
        onKeyDown={onEnterComment}
      />
    </section>
  );
};

export default PostCardCommentBox;
