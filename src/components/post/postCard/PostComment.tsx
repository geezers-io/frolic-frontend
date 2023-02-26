import React, { memo, useCallback } from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useRecoilValue } from 'recoil';

import { CommentInfo } from 'api/@types/comments';
import { CommentsService } from 'api/services';
import PostCommentEditModal from 'components/post/postCard/PostCommentEditModal';
import UserIcon from 'components/userPanel/UserIcon';
import { useModal } from 'hooks/useModal';
import { meAtom } from 'stores/atom/user';

interface Props {
  postId: number;
  postOwnerId: number;
  comment: CommentInfo;
  setComments: React.Dispatch<React.SetStateAction<CommentInfo[]>>;
}

const enum MenuKey {
  EditComment,
  DeleteComment,
}

const menuItems: ItemType[] = [
  { label: '댓글 수정', key: MenuKey.EditComment },
  { type: 'divider' },
  { label: '댓글 삭제', key: MenuKey.DeleteComment },
];

const PostComment: React.FC<Props> = ({ postId, postOwnerId, comment, setComments }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const me = useRecoilValue(meAtom);
  const { isModalOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

  const handleEditModalOk = useCallback(
    async (edited: CommentInfo) => {
      try {
        const updated = await CommentsService.updateComment({
          postId: edited.postId,
          postOwnerId,
          commentId: edited.id,
          textContent: edited.textContent,
        });

        setComments((prev) =>
          prev.map((comment) => {
            return comment.id === updated.id ? updated : comment;
          })
        );
        messageApi.success('댓글이 수정되었습니다.');
      } catch (e) {
        messageApi.error(e.message);
      }
    },
    [messageApi, postOwnerId, setComments]
  );

  const handleDropdownClick = useCallback<Required<MenuProps>['onClick']>(
    async ({ key }) => {
      switch (Number(key)) {
        case MenuKey.EditComment: {
          openEditModal();
          break;
        }
        case MenuKey.DeleteComment: {
          try {
            await CommentsService.deleteComment({ commentId: comment.id });
            setComments((prev) =>
              prev.filter((comment) => {
                return comment.id !== comment.id;
              })
            );
            messageApi.success('댓글이 삭제되었습니다.');
          } catch (e) {
            messageApi.error(e.message);
          }
          break;
        }
      }
    },
    [comment.id, messageApi, openEditModal, setComments]
  );

  return (
    <>
      {contextHolder}

      <article className="flex justify-between">
        <section>
          <section className="mb-2">
            <UserIcon realname={comment.userInfo.realname} username={comment.userInfo.username} />
            <span className="text-sm font-medium ml-2">{comment.userInfo.realname}</span>
            <span className="text-sm text-gray-500 ml-1">@{comment.userInfo.username}</span>
          </section>
          <span className="text-sm">{comment.textContent}</span>
        </section>

        {me?.userInfo.id === comment.userInfo.id && (
          <Dropdown menu={{ items: menuItems, onClick: handleDropdownClick }}>
            <Button className="no-padding w-fit" type="text" size="small" icon={<MoreOutlined />} />
          </Dropdown>
        )}
      </article>

      <PostCommentEditModal
        isOpen={isEditModalOpen}
        onOk={handleEditModalOk}
        onCancel={closeEditModal}
        initialValues={comment}
      />
    </>
  );
};

export default memo(PostComment);
