import { CommentsServiceClient } from 'api/@types/comments';
import { api } from 'api/client';

export const CommentsService: CommentsServiceClient = {
  async createComment(body) {
    return await api.post(`/comments`, { ...body, replyUserId: null });
  },

  async updateComment({ commentId, ...rest }) {
    return await api.put(`/comments/${commentId}`, { ...rest, replyUserId: null });
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
