import { AuthServiceClient } from 'api/@types/auth';
import { api, rawAxios } from 'api/client';

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

  async reIssueAccessToken(body) {
    return await rawAxios.get('/auth/reissue', {
      headers: {
        authorization: `Bearer ${body.refreshToken}`,
      },
    });
  },

  async findEmailFirstStep(body) {
    return await api.post('/auth/finder/email', body);
  },

  async findEmailSecondStep(body) {
    return await api.post('/auth/finder/email/check', body);
  },

  async findPasswordFirstStep(body) {
    return await api.post('/auth/finder/password', body);
  },

  async findPasswordSecondStep(body) {
    return await api.post('/auth/finder/password/check', body);
  },
};
