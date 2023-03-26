import { useEffect, useState } from 'react';

import { message } from 'antd';

import { FileInfo } from 'api/@types/file';
import { getImageUrlsFromFiles } from 'utils/image';

export const useFetchImageUrls = (files: FileInfo[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const imageUrls = await getImageUrlsFromFiles(files);
        setImageUrls(imageUrls);
      } catch (e) {
        message.error(e.message);
      }
    })();
  }, [files]);

  return imageUrls;
};
