import React from 'react';

import { Form, Input, Modal } from 'antd';

import { CommentInfo } from 'api/@types/comments';

interface FormValues {
  textContent: string;
}

interface Props {
  initialValues: CommentInfo;
  isOpen: boolean;
  onOk: (edited: CommentInfo) => void;
  onCancel: () => void;
}

const PostCommentEditModal: React.FC<Props> = ({ initialValues, isOpen, onOk, onCancel }) => {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    onOk({
      ...initialValues,
      textContent: values.textContent,
    });
  };

  return (
    <Modal
      title="댓글 수정"
      open={isOpen}
      onOk={form.submit}
      onCancel={onCancel}
      okText="수정"
      cancelText="닫기"
      centered
    >
      <Form<FormValues> form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item>
          <Input.TextArea defaultValue={initialValues.textContent} rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostCommentEditModal;
