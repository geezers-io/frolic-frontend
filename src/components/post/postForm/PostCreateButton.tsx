import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import PostForm from 'components/post/postForm/PostForm';
import { useModal } from 'hooks/useModal';

const PostCreateButton = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button
        className="fixed right-6 bottom-6 w-14 h-14 z-[999]"
        type="primary"
        shape="circle"
        icon={<FormOutlined className="text-2xl" />}
        onClick={openModal}
        style={{
          display: isModalOpen ? 'none' : 'initial',
        }}
      />
      <PostForm visible={isModalOpen} onCancel={closeModal} />
    </>
  );
};

export default PostCreateButton;
