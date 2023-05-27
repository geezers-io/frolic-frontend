import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useRecoilValue } from 'recoil';

import { DeleteMeRequest } from 'api/@types/users';
import { UsersService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import atomStore from 'stores/atom';
import { requiredRule } from 'utils/formRules';
import { passwordRegex } from 'utils/regex';

interface FormValues extends DeleteMeRequest {}

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
        await UsersService.deleteMe({ password });
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
    <>
      {contextHolder}

      <Form<FormValues>
        onFinish={deleteUser}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        form={form}
        layout="vertical"
      >
        <Form.Item
          label={
            <span>
              <b>{me?.userInfo.username}</b> 을(를) 입력해주세요
            </span>
          }
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
          <Input placeholder={me?.userInfo.username} allowClear />
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

        <Button danger block htmlType="submit" className="float-right mt-5">
          계정 삭제
        </Button>
      </Form>
    </>
  );
};

export default UserDeleteForm;
