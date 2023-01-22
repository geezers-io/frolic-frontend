import { NextPage } from 'next';
import React from 'react';

import UserConfigForm from 'components/userPanel/UserConfigForm';
import AuthLayout from 'layouts/AuthLayout';

const UserConfigPage: NextPage = () => {
  return (
    <AuthLayout title="프로필 변경">
      <UserConfigForm />
    </AuthLayout>
  );
};

export default UserConfigPage;
