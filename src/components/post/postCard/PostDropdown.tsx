import React, { useCallback } from 'react';

import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import PostForm from 'components/post/postForm/PostForm';
import { useModal } from 'hooks/useModal';
import { PostsHandler } from 'hooks/usePostsInfinityScroll';

interface Props {
  post: Post;
  postsHandler: PostsHandler;
}

const enum MenuKeys {
  EditPost,
  DeletePost,
}

const menuItems: ItemType[] = [
  { label: '게시글 수정', key: MenuKeys.EditPost },
  { type: 'divider' },
  { label: '게시글 삭제', key: MenuKeys.DeletePost },
];

const PostDropdown: React.FC<Props> = ({ post, postsHandler }) => {
  const { isModalOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const [messageApi, contextHolder] = message.useMessage();

  const deletePost = useCallback(
    async (postId: number) => {
      try {
        await PostsService.deletePost({ postId: post.id });
        postsHandler.remove(postId);
        messageApi.success('게시글을 삭제하였습니다.');
      } catch (e) {
        messageApi.error(e.message);
      }
    },
    [messageApi, post.id, postsHandler]
  );

  const onClickDropdown = useCallback<Required<MenuProps>['onClick']>(
    async ({ key }) => {
      switch (Number(key)) {
        case MenuKeys.EditPost:
          openEditModal();
          return;
        case MenuKeys.DeletePost:
          await deletePost(post.id);
          return;
      }
    },
    [openEditModal, deletePost, post.id]
  );

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items: menuItems, onClick: onClickDropdown }}>
        <Button
          type="text"
          className="absolute right-2 no-padding"
          icon={<EllipsisOutlined className="text-xl text-gray-900" />}
        />
      </Dropdown>

      {isEditModalOpen && (
        <PostForm onOk={postsHandler.edit} onCancel={closeEditModal} visible={true} initialValues={post} />
      )}
    </>
  );
};

export default PostDropdown;
