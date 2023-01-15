import React from 'react';

import shortid from 'shortid';

import Hashtag from './Hashtag';

interface Props {
  tags: string[];
}

const HashtagList: React.FC<Props> = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <Hashtag key={shortid.generate()} tag={tag} />
    ))}
  </>
);

export default HashtagList;
