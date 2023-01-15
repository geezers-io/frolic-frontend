import React, { CSSProperties } from 'react';

interface Props {
  height?: CSSProperties['height'];
}

const EmptySpace: React.FC<Props> = ({ height = 10 }) => {
  return <section style={{ height }}></section>;
};

export default EmptySpace;
