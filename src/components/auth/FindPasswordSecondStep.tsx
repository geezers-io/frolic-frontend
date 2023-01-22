import React, { useCallback, useState } from 'react';

import { Button, Form, Input, message, Statistic } from 'antd';
import { CountdownProps } from 'antd/es/statistic/Countdown';

import { FindPasswordFirstStepRequest, FindPasswordSecondStepRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { requiredRule } from 'utils/formRules';

const { Countdown } = Statistic;

interface Props {
  next: () => void;
  firstStepValues: FindPasswordFirstStepRequest;
}

interface FormValues extends FindPasswordSecondStepRequest {}

const codeExtraMessage = (
  <>
    <p className="mt-1 mb-0">인증번호를 발송했습니다.(유효시간 10분, 최대 시도 5회)</p>
    <p>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</p>
  </>
);
const ONE_MINUTE = 1000 * 60;
const getInitialCount = () => {
  return Date.now() + 1000 * 60 * 10;
};

const FindPasswordSecondStep: React.FC<Props> = ({ next, firstStepValues }) => {
  const [form] = Form.useForm<FormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [count, setCount] = useState(getInitialCount());
  const [isImminent, setIsImminent] = useState(false);

  const onChangeCount: Required<CountdownProps>['onChange'] = useCallback(
    (value) => {
      if ((value as number) > ONE_MINUTE) return;
      if (isImminent) return;
      setIsImminent(true);
    },
    [isImminent]
  );

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

  const reSendCode = useCallback(async () => {
    try {
      await AuthService.findPasswordFirstStep(firstStepValues);
      setCount(getInitialCount());
      setIsImminent(false);
      form.resetFields();
      messageApi.info('인증번호가 재전송되었습니다.');
    } catch (err) {
      messageApi.error(err.message);
    }
  }, [firstStepValues, form, messageApi]);

  return (
    <>
      {contextHolder}

      <Form<FormValues> form={form} onFinish={handleSubmit}>
        <Form.Item name="code" label="인증번호" rules={[requiredRule]} extra={codeExtraMessage}>
          <Input
            placeholder="인증번호를 입력하세요"
            suffix={
              <Countdown
                valueStyle={{ fontSize: 14, color: isImminent ? 'red' : undefined }}
                value={count}
                format="mm:ss"
                onChange={onChangeCount}
              />
            }
          />
        </Form.Item>

        <div className="flex gap-2 float-right">
          <Button onClick={reSendCode}>재전송</Button>
          <Button type="primary" htmlType="submit">
            다음
          </Button>
        </div>
      </Form>
    </>
  );
};

export default FindPasswordSecondStep;
