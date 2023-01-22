import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';

import { FindEmailSecondStepRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { requiredRule } from 'utils/formRules';

interface Props {
  next: (email: string) => void;
}

interface FormValues extends FindEmailSecondStepRequest {}

const FindEmailSecondStep: React.FC<Props> = ({ next }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const { email } = await AuthService.findEmailSecondStep(values);
        next(email);
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
        <Form.Item name="code" label="코드" hasFeedback={hasFeedback} rules={[requiredRule]}>
          <Input allowClear />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="float-right">
          다음
        </Button>
      </Form>
    </>
  );
};

export default FindEmailSecondStep;
