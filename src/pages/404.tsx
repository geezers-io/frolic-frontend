import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { WarningFilled } from '@ant-design/icons';
import { Typography } from 'antd';

import AppLayout from 'layouts/AppLayout';

const { Text } = Typography;

const Error404Page: NextPage = () => (
  <AppLayout>
    <section className="w-full h-full flex flex-col items-center justify-center">
      <WarningFilled style={{ fontSize: '5rem' }} />
      <Text className="text-2xl mt-5">해당하는 페이지가 없습니다.</Text>
      <Link href="/" className="text-sky-600 text-xl">
        메인으로 돌아가기
      </Link>
    </section>
  </AppLayout>
);

export default Error404Page;
