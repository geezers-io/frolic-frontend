import { AuthServiceClient } from 'api/@types/auth';
import { api } from 'api/client';

export const AuthService: AuthServiceClient = {
  async createUser(body) {
    return await api.post('/auth/signup', body);
  },

  async login(body) {
    return await api.post('/auth/login', body);
  },

  async logout() {
    return await api.get('/auth/logout');
  },

  async findEmailFirstStep() {
    return await api.post('/auth/finder/email');
  },

  async findEmailSecondStep() {
    return await api.post('/auth/finder/email/check');
  },

  async findPasswordFirstStep() {
    return await api.post('/auth/finder/password');
  },

  async findPasswordSecondStep() {
    return await api.post('/auth/finder/password/check');
  },

  async reIssueAccessToken(body) {
    return await api.get('/auth/reissue', {
      headers: {
        authorization: `Bearer ${body.refreshToken}`,
      },
    });
  },
};
