export interface FileInfo {
  id: number;
  downloadUrl: string;
  filename: string;
}

export interface UploadFileRequest {
  file: File;
}

export interface FileServiceClient {
  /**
   * 파일을 업로드합니다.
   */
  uploadFile(request: UploadFileRequest): Promise<FileInfo>;
}
