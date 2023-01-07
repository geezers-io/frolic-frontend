import React, { useCallback } from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { Comment } from 'api/@types/comments';
import { CommentsService } from 'api/services';
import { alertNotImpl } from 'hooks/alertNotImpl';

interface Props {
  commentId: number;
  postId: number;
  postOwnerId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
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

const PostCommentsDropdown: React.FC<Props> = ({ postId, commentId, postOwnerId, setComments }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleDropdownClick = useCallback<Required<MenuProps>['onClick']>(
    async ({ key }) => {
      try {
        switch (Number(key)) {
          case MenuKey.EditComment: {
            // await CommentsService.updateComment({ ... });
            // messageApi.success('댓글이 수정되었습니다.');
            alertNotImpl();
            return;
          }
          case MenuKey.DeleteComment: {
            await CommentsService.deleteComment({ commentId });
            setComments((prev) => {
              return prev.filter((comment) => comment.id !== commentId);
            });
            messageApi.success('댓글이 삭제되었습니다.');
            return;
          }
          default: {
            return;
          }
        }
      } catch (e) {
        messageApi.error(e.message);
      }
    },
    [messageApi, commentId, setComments]
  );

  return (
    <>
      {contextHolder}

      <Dropdown menu={{ items: menuItems, onClick: handleDropdownClick }}>
        <Button className="p-0 no-padding" type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
    </>
  );
};

export default PostCommentsDropdown;
