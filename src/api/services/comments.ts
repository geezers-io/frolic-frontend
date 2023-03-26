import { CommentsServiceClient } from 'api/@types/comments';
import { api } from 'api/client';

export const CommentsService: CommentsServiceClient = {
  async createComment(body) {
    return await api.post(`/comments`, body);
  },

  async updateComment({ commentId, ...body }) {
    return await api.put(`/comments/${commentId}`, body);
  },

  async getCommentDetail(body) {
    return await api.get(`/comments/${body.commentId}`);
  },

  async deleteComment(body) {
    return await api.delete(`/comments/${body.commentId}`);
  },

  async getCommentsByPostId(body) {
    return await api.get(`/comments/posts/${body.postId}`);
  },

  async getCommentsByUsername(body) {
    return await api.get(`/comments/username/${body.username}`);
  },
};
