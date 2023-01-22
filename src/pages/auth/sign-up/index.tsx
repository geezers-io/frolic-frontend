import { NextPage } from 'next';
import React from 'react';

import SignUpForm from 'components/auth/SignUpForm';
import AuthLayout from 'layouts/AuthLayout';

const SignUpPage: NextPage = () => (
  <AuthLayout title="회원가입" hideHeaderSearchIcon>
    <SignUpForm />
  </AuthLayout>
);

export default SignUpPage;
