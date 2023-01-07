import React, { useCallback, useState } from 'react';

import { Image } from 'antd';
import shortid from 'shortid';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  imageUrls: string[];
}

const PostCardCarousel: React.FC<Props> = ({ imageUrls }) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleClickImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setPreviewVisible(true);
  }, []);

  if (!imageUrls || imageUrls.length === 0) return null;
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={shortid.generate()} className="bg-black/90">
            <Image
              src={url}
              alt=""
              width="100%"
              height="auto"
              className="max-h-80 object-contain"
              preview={{ visible: false }}
              style={{
                minHeight: '18rem',
              }}
              onClick={() => {
                handleClickImage(index);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => {
              setPreviewVisible(visible);
            },
            current: currentImageIndex,
          }}
        >
          {imageUrls.map((url) => (
            <Image key={shortid.generate()} src={url} alt="" width="100%" height="auto" />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default PostCardCarousel;
