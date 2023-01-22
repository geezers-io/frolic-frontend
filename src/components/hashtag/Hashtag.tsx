import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { Typography } from 'antd';
import shortid from 'shortid';

import { hashtagsParser } from 'utils/hashtagParser';

const { Text } = Typography;

interface Props {
  tag: string;
}

const Hashtag: React.FC<Props> = ({ tag }) => {
  const router = useRouter();

  const onClickTag = useCallback(() => {
    router.push({
      pathname: '/search',
      query: { hashtags: hashtagsParser.serialize([tag]) },
    });
  }, [router, tag]);

  return (
    <Text onClick={onClickTag} className="text-sky-500 pr-0.5 cursor-pointer" key={shortid.generate()}>
      {tag}
    </Text>
  );
};

export default Hashtag;
