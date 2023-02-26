import React from 'react';

import { Empty } from 'antd';

interface Props {
  content?: string;
}

const EmptyFeed: React.FC<Props> = ({ content = '아직 피드가 없습니다.' }) => (
  <section className="my-10 flex-1 flex flex-col justify-center">
    <Empty
      imageStyle={{
        height: 80,
      }}
      description={
        <div>
          <p>{content}</p>
        </div>
      }
    />
  </section>
);

export default EmptyFeed;
