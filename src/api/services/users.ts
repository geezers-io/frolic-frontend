import { UsersServiceClient } from 'api/@types/users';
import { api, rawAxios } from 'api/client';

export const UsersService: UsersServiceClient = {
  async getMe() {
    return await rawAxios.get('/users');
  },

  async getUser(body) {
    return await api.get(`/users/${body.username}`);
  },

  async updateMe(body) {
    return await api.put('/users', body);
  },

  async updateMyPassword(body) {
    return await api.patch('/users/password', body);
  },

  async deleteMe(body) {
    return await api.delete('/users', body);
  },

  async getMyFollowers() {
    return await api.get('/users/follower');
  },

  async getMyFollowings() {
    return await api.get('/users/following');
  },

  async getFollowersByUsername(body) {
    return await api.get(`/users/follower/${body.username}`);
  },

  async getFollowingsByUsername(body) {
    return await api.get(`/users/following/${body.username}`);
  },

  async follow(body) {
    return await api.get(`/users/follow?username=${body.username}`);
  },

  async unFollow(body) {
    return await api.delete(`/users/follow?username=${body.username}`);
  },

  async checkFollow(body) {
    return await api.get(`/users/follow/exists?username=${body.username}`);
  },

  async checkFollowing(body) {
    return await api.get(`/users/following/exists?username=${body.username}`);
  },
};
