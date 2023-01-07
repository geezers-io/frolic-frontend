import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Typography } from 'antd';
import qs from 'qs';
import shortid from 'shortid';

const { Text } = Typography;

interface Props {
  tag: string;
}

const Hashtag: React.FC<Props> = ({ tag }) => {
  const router = useRouter();

  const onClickTag = useCallback(() => {
    router.push(`/search?${qs.stringify({ hashtags: [tag] })}`);
  }, [router, tag]);

  return (
    <Text onClick={onClickTag} className="text-sky-500 pr-0.5 cursor-pointer" key={shortid.generate()}>
      {tag}
    </Text>
  );
};

export default Hashtag;
