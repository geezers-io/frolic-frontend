import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';

import { UpdateMyPasswordRequest } from 'api/@types/user';
import { UserService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { requiredRule } from 'utils/formRules';
import { passwordRegex } from 'utils/regex';

interface FormValues extends UpdateMyPasswordRequest {}

const PasswordConfigForm: React.FC = () => {
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const updatePassword = useCallback(
    async ({ prevPassword, newPassword }: FormValues) => {
      try {
        // setLoading(true);
        await UserService.updateMyPassword({ prevPassword, newPassword });
        messageApi.info('비밀번호가 변경되었습니다.');
      } catch (err) {
        messageApi.error(err.message);
      } finally {
        // setLoading(false);
      }
    },
    [messageApi]
  );

  return (
    <>
      {contextHolder}

      <Form<FormValues>
        className="w-full"
        form={form}
        onFinish={updatePassword}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item name="prevPassword" label="기존 비밀번호" rules={[requiredRule]} hasFeedback={hasFeedback}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="비밀번호"
          rules={[
            {
              pattern: passwordRegex,
              message: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요',
            },
            requiredRule,
          ]}
          hasFeedback={hasFeedback}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="float-right">
          변경하기
        </Button>
      </Form>
    </>
  );
};

export default PasswordConfigForm;
