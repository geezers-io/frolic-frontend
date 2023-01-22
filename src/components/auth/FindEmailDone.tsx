import { useRouter } from 'next/router';
import React from 'react';

import { Button, Typography } from 'antd';

interface Props {
  email: string;
}

const FindEmailDone: React.FC<Props> = ({ email }) => {
  const router = useRouter();

  const moveToSignInPage = () => {
    router.push('/auth/sign-in');
  };

  return (
    <>
      <section className="my-8">
        <span>
          귀하의 이메일은{' '}
          <Typography.Text copyable underline>
            {email}
          </Typography.Text>{' '}
          입니다.
        </span>
      </section>

      <Button type="primary" onClick={moveToSignInPage} block>
        로그인 페이지로 이동
      </Button>
    </>
  );
};

export default FindEmailDone;
