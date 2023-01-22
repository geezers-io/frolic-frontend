import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { useSetRecoilState } from 'recoil';

import { LoginRequest } from 'api/@types/auth';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import atomStore from 'stores/atom';
import { requiredRule } from 'utils/formRules';
import { token } from 'utils/token';

interface FormValues extends LoginRequest {
  remember: boolean;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const setMe = useSetRecoilState(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = useCallback(
    async ({ email, password, remember }: FormValues) => {
      try {
        token.clear();

        const {
          tokenInfo: { accessToken, refreshToken },
          userUnitedInfo,
        } = await AuthService.login({
          email,
          password,
        });

        setMe(() => userUnitedInfo);

        token.refreshToken.set(refreshToken, remember);
        token.accessToken.set(accessToken);

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

      <section className="w-full">
        <h1 className="text-2xl mt-3 mb-7 text-center">로그인</h1>

        <Form<FormValues>
          onFinish={onFinish}
          validateTrigger={formValidateTrigger}
          onFinishFailed={onFormFinishFailed}
          scrollToFirstError
        >
          <Form.Item name="email" rules={[requiredRule]} hasFeedback={hasFeedback}>
            <Input prefix={<UserOutlined />} placeholder="이메일" allowClear />
          </Form.Item>
          <Form.Item name="password" rules={[requiredRule]} hasFeedback={hasFeedback}>
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="비밀번호" allowClear />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>

          <Button type="primary" size="large" htmlType="submit" className="w-full mt-5 mb-4">
            로그인
          </Button>

          <div className="flex items-center justify-center pr-3">
            <Link href="/auth/find-password" className="p-0 text-gray-600">
              비밀번호 찾기
            </Link>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Link href="/auth/find-email" className="p-0 text-gray-600">
              이메일 찾기
            </Link>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Link href="/auth/sign-up" className="p-0 text-gray-600">
              회원가입
            </Link>
          </div>
        </Form>
      </section>
    </>
  );
};

export default SignInForm;
