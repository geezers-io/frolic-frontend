import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useRecoilValue } from 'recoil';

import { CommentInfo } from 'api/@types/comments';
import { CommentsService } from 'api/services';
import PostComment from 'components/post/postCard/PostComment';
import { meAtom } from 'stores/atom/user';

interface Props {
  postId: number;
  setCommentsLength: React.Dispatch<React.SetStateAction<number>>;
}

const mockComments: CommentInfo[] = [
  {
    id: 1,
    postId: 1,
    textContent:
      '댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1',
    userInfo: {
      id: 1,
      email: 'email@gmail.com',
      username: 'husername',
      realname: 'hrealname',
      phoneNumber: 'phoneNumber',
      createdDate: '2023-02-19T11:51:45.128Z',
      updatedDate: '2023-02-19T11:51:45.128Z',
    },
  },
  {
    id: 2,
    postId: 1,
    textContent:
      '댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1',
    userInfo: {
      id: 1,
      email: 'email@gmail.com',
      username: 'ausername',
      realname: 'arealname',
      phoneNumber: 'phoneNumber',
      createdDate: '2023-02-19T11:51:45.128Z',
      updatedDate: '2023-02-19T11:51:45.128Z',
    },
  },
  {
    id: 3,
    postId: 1,
    textContent:
      '댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1',
    userInfo: {
      id: 1,
      email: 'email@gmail.com',
      username: 'zusername',
      realname: 'zrealname',
      phoneNumber: 'phoneNumber',
      createdDate: '2023-02-19T11:51:45.128Z',
      updatedDate: '2023-02-19T11:51:45.128Z',
    },
  },
  {
    id: 4,
    postId: 1,
    textContent:
      '댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1댓글 1',
    userInfo: {
      id: 1,
      email: 'email@gmail.com',
      username: 'dusername',
      realname: 'drealname',
      phoneNumber: 'phoneNumber',
      createdDate: '2023-02-19T11:51:45.128Z',
      updatedDate: '2023-02-19T11:51:45.128Z',
    },
  },
];

const PostComments: React.FC<Props> = ({ postId, setCommentsLength }) => {
  const me = useRecoilValue(meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [commentInputValue, setCommentInputValue] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const trimmedCommentInputValue = useMemo(() => {
    return commentInputValue.trim();
  }, [commentInputValue]);

  const getComments = useCallback(async () => {
    try {
      const comments = await CommentsService.getCommentsByPostId({ postId });

      setComments(comments);
    } catch (err) {
      messageApi.error(err.message);
    }
  }, [messageApi, postId]);

  const resizeCommentInput = useCallback(() => {
    if (!commentInputRef.current) return;
    commentInputRef.current.style.height = `0px`;
    commentInputRef.current.style.height = `${commentInputRef.current.scrollHeight}px`;
  }, []);

  const handleChangeCommentInput = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(({ target }) => {
    setCommentInputValue(target.value);
  }, []);

  const addComment = useCallback(async () => {
    if (!me) return;
    if (!trimmedCommentInputValue) return;

    try {
      const added = await CommentsService.createComment({
        postId,
        textContent: trimmedCommentInputValue,
        postOwnerId: me.userInfo.id,
      });

      setCommentsLength((prev) => prev + 1);
      setComments((prev) => [added, ...prev]);
      setCommentInputValue('');
    } catch (err) {
      messageApi.error(err.message);
    }
  }, [me, messageApi, postId, setCommentsLength, trimmedCommentInputValue]);

  const handleKeyDownCommentInput = useCallback<React.KeyboardEventHandler<HTMLTextAreaElement>>(
    async (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        await addComment();
      }
    },
    [addComment]
  );

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    resizeCommentInput();
  }, [commentInputRef.current, commentInputValue]);

  console.log('render');

  return (
    <>
      {contextHolder}

      <section className="pt-3 flex items-start gap-1.5">
        <UserOutlined className="pt-[0.55rem]" />
        <textarea
          placeholder="댓글 달기..."
          className="flex-1 pt-[0.5rem] textarea-font-base placeholder-gray-500 shadow-none border-none outline-none overflow-hidden resize-none"
          ref={commentInputRef}
          value={commentInputValue}
          onChange={handleChangeCommentInput}
          onKeyDown={handleKeyDownCommentInput}
        />
        <Button
          type="link"
          className="pt-[0.5rem] leading-none h-8 px-1"
          onClick={addComment}
          disabled={trimmedCommentInputValue.length === 0}
        >
          게시
        </Button>
      </section>

      {!!mockComments.length && (
        <div className="flex flex-col gap-4 max-h-[10.5rem] overflow-y-auto my-4 border-gray-400 scrollbar-none">
          {mockComments.map((comment) => (
            <PostComment key={'comment-' + comment.id} comment={comment} postId={postId} setComments={setComments} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostComments;
