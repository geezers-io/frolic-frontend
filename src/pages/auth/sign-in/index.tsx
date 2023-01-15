import { NextPage } from 'next';
import React from 'react';

import SignInForm from 'components/auth/SignInForm';
import AuthLayout from 'layouts/AuthLayout';

const SignInPage: NextPage = () => (
  <AuthLayout hideHeaderSearchIcon hideHeaderProfileIcon>
    <SignInForm />
  </AuthLayout>
);

export default SignInPage;
