import { NextPage } from 'next';
import React from 'react';

import SignInForm from 'components/auth/SignInForm';
import AuthLayout from 'layouts/AuthLayout';

const SignInPage: NextPage = () => (
  <AuthLayout title="로그인" hideHeaderSearchIcon hideHeaderProfileIcon>
    <SignInForm />
  </AuthLayout>
);

export default SignInPage;
