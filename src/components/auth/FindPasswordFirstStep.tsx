import Link from 'next/link';
import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';

import { FindPasswordFirstStepRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { requiredRule } from 'utils/formRules';
import { phoneNumberRegex } from 'utils/regex';

interface Props {
  next: (values: FindPasswordFirstStepRequest) => void;
}

interface FormValues extends FindPasswordFirstStepRequest {}

const FindPasswordFirstStep: React.FC<Props> = ({ next }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await AuthService.findPasswordFirstStep(values);
        next(values);
      } catch (err) {
        messageApi.error(err.message);
      }
    },
    [messageApi, next]
  );

  return (
    <>
      {contextHolder}

      <Form<FormValues>
        validateTrigger={formValidateTrigger}
        onFinish={handleSubmit}
        onFinishFailed={onFormFinishFailed}
      >
        <Form.Item
          name="phoneNumber"
          label="전화번호"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              pattern: phoneNumberRegex,
              message: '하이픈(-)없이 9~11자 숫자를 사용하세요',
            },
          ]}
        >
          <Input allowClear placeholder="01000000000" />
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              type: 'email',
              message: '올바른 이메일을 입력해주세요',
            },
          ]}
          extra={
            <span>
              이메일이 기억나지 않는다면? <Link href="/auth/find-email">이메일 찾기</Link>
            </span>
          }
        >
          <Input allowClear />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="float-right">
          다음
        </Button>
      </Form>
    </>
  );
};

export default FindPasswordFirstStep;
