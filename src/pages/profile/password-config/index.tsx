import { NextPage } from 'next';
import React from 'react';

import PasswordConfigForm from 'components/userPanel/PasswordConfigForm';
import AuthLayout from 'layouts/AuthLayout';

const PasswordConfigPage: NextPage = () => {
  return (
    <AuthLayout title="비밀번호 변경">
      <PasswordConfigForm />
    </AuthLayout>
  );
};

export default PasswordConfigPage;
