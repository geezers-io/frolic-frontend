import { useEffect, useState } from 'react';

import { FileInfo } from 'api/@types/file';
import { getImageUrlsFromFiles } from 'utils/image';

export const useFetchImageUrls = (files: FileInfo[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const imageUrls = await getImageUrlsFromFiles(files);
      setImageUrls(imageUrls);
    })();
  }, [files]);

  return imageUrls;
};
