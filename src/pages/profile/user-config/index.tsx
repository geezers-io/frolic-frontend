import { NextPage } from 'next';
import React from 'react';

import UserConfigForm from 'components/userPanel/UserConfigForm';
import AuthLayout from 'layouts/AuthLayout';

const UserConfigPage: NextPage = () => {
  return (
    <AuthLayout>
      <UserConfigForm />
    </AuthLayout>
  );
};

export default UserConfigPage;
