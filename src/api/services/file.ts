import { FileServiceClient } from 'api/@types/file';
import { api, rawAxios } from 'api/client';

export const FileService: FileServiceClient = {
  async uploadFile(body) {
    const formData = new FormData();

    formData.append('image', body.file);

    return await api.post(`/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async downloadFile(filename: string) {
    return await rawAxios
      .get<Blob>(`/file/${encodeURIComponent(filename)}`, { responseType: 'blob' })
      .then((data) => new Blob([data.data]));
  },
};
