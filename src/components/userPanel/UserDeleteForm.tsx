import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useRecoilValue } from 'recoil';

import { DeleteMeRequest } from 'api/@types/user';
import { UserService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import atomStore from 'stores/atom';
import { requiredRule } from 'utils/formRules';
import { passwordRegex } from 'utils/regex';

interface FormValues extends DeleteMeRequest {}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const UserDeleteForm: React.FC = () => {
  const router = useRouter();
  const me = useRecoilValue(atomStore.meAtom);
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const deleteUser = useCallback(
    async ({ password }: FormValues) => {
      try {
        // setLoading(true);
        await UserService.deleteMe({ password });
        router.push('/sign-in');
      } catch (err) {
        messageApi.error(err);
      } finally {
        // setLoading(false);
      }
    },
    [messageApi, router]
  );

  return (
    <div className="w-full flex flex-col">
      {contextHolder}
      <span className="text-center font-bold text-lg mb-5">계정 삭제를 위한 비밀번호 확인</span>
      <Form<FormValues>
        onFinish={deleteUser}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        form={form}
        {...layout}
      >
        <Form.Item
          label={`${me?.userInfo.username} 을 입력해주세요`}
          name="username"
          rules={[
            () => ({
              validator(_, value) {
                if (value !== me?.userInfo.username) {
                  return Promise.reject(new Error('사용자 명이 일치하지 않습니다.'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              pattern: passwordRegex,
              message: '올바른 비밀번호를 입력해주세요',
            },
            requiredRule,
          ]}
          hasFeedback={hasFeedback}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item>
          <Button danger htmlType="submit">
            계정 삭제
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDeleteForm;
