import React from 'react';

import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  tags: string[];
}

const PostCardHashtags: React.FC<Props> = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <Text className="text-sky-500 pr-0.5" key={'postCardHashTag-' + tag}>
        {tag}
      </Text>
    ))}
  </>
);

export default PostCardHashtags;
