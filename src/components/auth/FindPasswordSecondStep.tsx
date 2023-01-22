import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';

import { FindPasswordSecondStepRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { requiredRule } from 'utils/formRules';

interface Props {
  next: () => void;
}

interface FormValues extends FindPasswordSecondStepRequest {}

const FindPasswordSecondStep: React.FC<Props> = ({ next }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await AuthService.findPasswordSecondStep(values);
        next();
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

export default FindPasswordSecondStep;
