import qs from 'qs';

import { PostsServiceClient } from 'api/@types/posts';
import { api } from 'api/client';

/**
 * @suppress 파일 업로드, 파일 get 관련 기능은 아직 지원하지 않습니다. 2022-11-15
 */
export const PostsService: PostsServiceClient = {
  async createPost({ textContent, hashtags = [], files = [] }) {
    const formData = new FormData();

    formData.append(
      'createPostRequest',
      JSON.stringify({
        textContent,
        hashtags,
      })
    );
    for (const file of files) {
      formData.append('files', file);
    }

    return await api.post(`/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updatePost({ postId, textContent, hashtags = [], prevFileDownloadUrls = [], files = [] }) {
    const formData = new FormData();

    formData.append(
      'updateRequest',
      JSON.stringify({
        textContent,
        hashtags,
        prevFileDownloadUrls,
      })
    );
    for (const file of files) {
      formData.append('files', file);
    }

    return await api.put(`/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deletePost(body) {
    return await api.delete(`/posts/${body.postId}`);
  },

  async getPosts(body) {
    return await api.get(`/posts/list?${qs.stringify(body)}`);
  },

  async getPost(body) {
    return await api.get(`/posts/${body.postId}`);
  },

  async getUserPosts(body) {
    return await api.get(`/posts/list/token?${qs.stringify(body)}`);
  },

  async getPostsByHashtags(body) {
    return await api.get(`/posts/search?${qs.stringify(body.hashtags)}`);
  },

  async likePost(body) {
    return await api.get(`/posts/like?${qs.stringify(body)}`);
  },

  async unlikePost(body) {
    return await api.delete(`/posts/like?${qs.stringify(body)}`);
  },
};
