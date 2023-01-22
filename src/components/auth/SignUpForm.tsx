import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useSetRecoilState } from 'recoil';

import { CreateUserRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import atomStore from 'stores/atom';
import { requiredRule } from 'utils/formRules';
import { passwordRegex, phoneNumberRegex, realnameRegex, usernameRegex } from 'utils/regex';
import { token } from 'utils/token';

interface FormValues extends CreateUserRequest {
  passwordConfirm?: string;
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const setMe = useSetRecoilState(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const createUser = useCallback(
    async (values: FormValues) => {
      try {
        token.clear();

        delete values.passwordConfirm;

        const {
          tokenInfo: { accessToken, refreshToken },
          userUnitedInfo,
        } = await AuthService.createUser(values);

        setMe(() => userUnitedInfo);

        token.refreshToken.set(refreshToken, true);
        token.accessToken.set(accessToken);

        messageApi.success('회원가입 성공');
        router.push('/');
      } catch (err) {
        messageApi.error(err.message);
      }
    },
    [messageApi, router, setMe]
  );

  return (
    <>
      {contextHolder}

      <Form<FormValues>
        form={form}
        validateTrigger={formValidateTrigger}
        onFinish={createUser}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
        {...layout}
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: 'email',
              message: '올바른 이메일을 입력해주세요',
            },
            requiredRule,
          ]}
          hasFeedback={hasFeedback}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="password"
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
        <Form.Item
          name="username"
          label="사용자 아이디"
          hasFeedback={hasFeedback}
          tooltip="다른 사람들에게 보여질 이름입니다. 언제든지 변경할 수 있습니다."
          rules={[
            requiredRule,
            {
              pattern: usernameRegex,
              message: '4~15자 영문 대 소문자, 숫자, 밑줄을 사용하세요. 최소 한개의 영문이 포함되어야 합니다',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="realname"
          label="실명"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              pattern: realnameRegex,
              message: '1~12자 영문 대 소문자, 한글을 사용하세요',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
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

        <Button type="primary" size="large" htmlType="submit" className="w-full mt-4">
          가입하기
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
