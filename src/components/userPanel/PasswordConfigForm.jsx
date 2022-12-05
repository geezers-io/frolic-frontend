import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { UserService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { passwordRegex, requiredRule } from 'utils';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const PasswordConfigForm = () => {
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [form] = Form.useForm();

  const updatePassword = useCallback(async ({ prevPassword, newPassword }) => {
    try {
      // setLoading(true);
      await UserService.updateLoginedUserPassword({ prevPassword, newPassword });
      alert('비밀번호가 변경되었습니다.');
    } catch (err) {
      alert(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  return (
    <Form
      className="w-full"
      form={form}
      onFinish={updatePassword}
      validateTrigger={formValidateTrigger}
      onFinishFailed={onFormFinishFailed}
      scrollToFirstError
      {...layout}
    >
      <Form.Item name="prvPassword" label="기존 비밀번호" rules={[requiredRule]} hasFeedback={hasFeedback}>
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
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            },
          }),
        ]}
      >
        <Input.Password allowClear />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          변경하기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordConfigForm;
