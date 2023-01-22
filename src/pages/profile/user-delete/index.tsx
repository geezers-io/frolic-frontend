import { NextPage } from 'next';
import React from 'react';

import UserDeleteForm from 'components/userPanel/UserDeleteForm';
import AuthLayout from 'layouts/AuthLayout';

const UserDeletePage: NextPage = () => {
  return (
    <AuthLayout title="계정 삭제">
      <UserDeleteForm />
    </AuthLayout>
  );
};

export default UserDeletePage;
