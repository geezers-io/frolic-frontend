import { FileServiceClient } from 'api/@types/file';
import { api } from 'api/client';

/**
 * @suppress 파일 업로드, 파일 get 관련 기능은 아직 지원하지 않습니다. 2022-11-15
 */
export const FileService: FileServiceClient = {
  async uploadFile(body) {
    const formData = new FormData();

    formData.append('file', body.file);

    return await api.post(`/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
