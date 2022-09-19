import { apiClient } from './client';
import { parseFailureResponse, parseSuccessResponse } from './helper';

/**
 * @description 게시글(피드) 정보를 불러옵니다. ( 기본 게시글 갯수: 3 )
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPosts = () =>
  apiClient.post('/api/posts')
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);
