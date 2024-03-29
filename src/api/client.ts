import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { ApiMethods } from 'api/@types/@shared';
import { RecoilSet } from 'stores/RecoilUtils';
import atomStore from 'stores/atom';
import { flow } from 'utils/flow';
import { token } from 'utils/token';

import { getErrorMessage, getRequestArgs } from './helper';
import { setAccessToken, logRequest } from './interceptors/request';
import { logError, logResponse } from './interceptors/response';
import { AuthService, UsersService } from './services';

const API_URL = {
  development: 'http://localhost:8081/api',
  test: 'https://galaxyhi4276.co/api',
  production: 'https://galaxyhi4276.co/api',
}[process.env.NODE_ENV ?? 'development'];

const _axios = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

_axios.interceptors.request.use(flow([logRequest, setAccessToken]), undefined);
_axios.interceptors.response.use(logResponse, logError);

export const rawAxios = _axios;

const axiosWrapper = async (
  method: keyof ApiMethods,
  route: string,
  body?: Record<string, unknown>,
  config: AxiosRequestConfig = {}
) => {
  const args = getRequestArgs(method, route, body, config);

  if (!args.length) {
    throw new Error('Invalid axios method');
  }

  try {
    const {
      data: { data },
    } = (await _axios[method].apply(null, args as any)) as any;

    return data;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status ?? error.status;

    const errorMessage = getErrorMessage(error);

    const isAuthError = status && [401, 403].includes(status);
    if (!isAuthError) {
      throw new Error(errorMessage);
    }

    try {
      const refreshToken = token.refreshToken.get();
      if (!refreshToken) {
        throw '';
      }

      const {
        data: {
          data: { accessToken: newAccessToken },
        },
      } = await AuthService.reIssueAccessToken({ refreshToken });

      token.accessToken.set(newAccessToken);

      const {
        data: { data: me },
      } = await UsersService.getMe();

      RecoilSet(atomStore.meAtom, me);

      const {
        data: { data },
      } = (await _axios[method].apply(null, args as any)) as any;

      return data;
    } catch {
      log.debug('토큰 갱신 실패, 인증 페이지로 이동합니다.');
      RecoilSet(atomStore.meAtom, undefined);
      token.clear();
      location.href = '/auth/sign-in';
    }
  }
};

export const api: ApiMethods = {
  get: (route, config) => axiosWrapper('get', route, {}, config),
  head: (route, config) => axiosWrapper('head', route, {}, config),
  delete: (route, body, config) => axiosWrapper('delete', route, body ?? {}, config),
  post: (route, body, config) => axiosWrapper('post', route, body ?? {}, config),
  put: (route, body, config) => axiosWrapper('put', route, body ?? {}, config),
  patch: (route, body, config) => axiosWrapper('patch', route, body ?? {}, config),
};
