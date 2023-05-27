import qs from 'qs';

import { PostsServiceClient } from 'api/@types/posts';
import { api } from 'api/client';

export const PostsService: PostsServiceClient = {
  async createPost(body) {
    return await api.post(`/posts`, body);
  },

  async updatePost({ postId, ...body }) {
    return await api.put(`/posts/${postId}`, body);
  },

  async deletePost(body) {
    return await api.delete(`/posts/${body.postId}`);
  },

  async getPosts(body) {
    return await api.post(`/posts/list`, body);
  },

  async getUserPosts(body) {
    return await api.post(`/posts/list/user`, body);
  },

  async getPostsByHashtags(body) {
    return await api.post(
      `/posts/list/search?${qs.stringify(
        {
          hashtags: body.hashtags,
        },
        { indices: false }
      )}`,
      {
        cursorId: body.cursorId,
      }
    );
  },

  async likePost(body) {
    return await api.get(`/posts/like?${qs.stringify(body)}`);
  },

  async unlikePost(body) {
    return await api.delete(`/posts/like?${qs.stringify(body)}`);
  },
};
