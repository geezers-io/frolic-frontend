import React from 'react';

import { Typography } from 'antd';
import shortid from 'shortid';

const { Text } = Typography;

interface Props {
  tags: string[];
}

const PostCardHashtags: React.FC<Props> = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <Text className="text-sky-500 pr-0.5" key={shortid.generate()}>
        {tag}
      </Text>
    ))}
  </>
);

export default PostCardHashtags;
