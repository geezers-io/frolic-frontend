import { FileInfo } from 'api/@types/file';
import { FileService } from 'api/services';

const { downloadFile } = FileService;
const getFilename = ({ filename }: FileInfo) => filename;

const blobToUrl = (blob: Blob) => URL.createObjectURL(blob);

export const getImageUrlsFromFiles = async (files: FileInfo[]): Promise<string[]> => {
  const blobs = await Promise.all(files.map(getFilename).map(downloadFile));
  return blobs.map(blobToUrl);
};

export const getImageBlob = (fileInfo: FileInfo) => downloadFile(fileInfo.filename);
