import { NextPage } from 'next';
import React from 'react';

import PasswordConfigForm from 'components/userPanel/PasswordConfigForm';
import AuthLayout from 'layouts/AuthLayout';

const PasswordConfigPage: NextPage = () => {
  return (
    <AuthLayout>
      <PasswordConfigForm />
    </AuthLayout>
  );
};

export default PasswordConfigPage;
