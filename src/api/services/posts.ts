import qs from 'qs';

import { PostsServiceClient } from 'api/@types/posts';
import { api } from 'api/client';

/**
 * @suppress 파일 업로드, 파일 get 관련 기능은 아직 지원하지 않습니다. 2022-11-15
 */
export const PostsService: PostsServiceClient = {
  async createPost(body) {
    return await api.post(`/v2/posts`, body);
  },

  async updatePost({ postId, ...body }) {
    return await api.put(`/v2/posts/${postId}`, body);
  },

  async deletePost(body) {
    return await api.delete(`/v2/posts/${body.postId}`);
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
