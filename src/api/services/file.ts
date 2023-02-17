import { FileServiceClient } from 'api/@types/file';
import { api } from 'api/client';

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
