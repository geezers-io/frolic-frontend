import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';

import { FindEmailFirstStepRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { formLayout } from 'utils/formLayout';
import { requiredRule } from 'utils/formRules';
import { phoneNumberRegex } from 'utils/regex';

interface Props {
  next: (values: FindEmailFirstStepRequest) => void;
}

interface FormValues extends FindEmailFirstStepRequest {}

const FindEmailFirstStep: React.FC<Props> = ({ next }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await AuthService.findEmailFirstStep(values);
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
        {...formLayout}
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

        <Button type="primary" htmlType="submit" className="float-right">
          다음
        </Button>
      </Form>
    </>
  );
};

export default FindEmailFirstStep;
