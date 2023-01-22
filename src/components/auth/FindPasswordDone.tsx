import { useRouter } from 'next/router';
import React from 'react';

import { Button } from 'antd';

interface Props {
  email: string;
}

const FindPasswordDone: React.FC<Props> = ({ email }) => {
  const router = useRouter();

  const moveToSignInPage = () => {
    router.push('/auth/sign-in');
  };

  return (
    <>
      <section className="my-8">
        <span className="leading-6">
          입력하신 이메일(<b>{email}</b>)로 임시 비밀번호가 발송되었습니다.
        </span>
      </section>

      <Button type="primary" onClick={moveToSignInPage} block>
        로그인 페이지로 이동
      </Button>
    </>
  );
};

export default FindPasswordDone;
