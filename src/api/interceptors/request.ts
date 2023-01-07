import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { printRequestLog } from 'utils/log';
import { token } from 'utils/token';

const routesWithoutAccessToken = ['/auth/login', '/auth/signup', '/auth/reissue'];

export function logRequest(config: AxiosRequestConfig) {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestObj: config.data,
    config,
  });

  return config;
}

export function setAccessToken(config: AxiosRequestConfig) {
  if (routesWithoutAccessToken.includes(config.url as string)) {
    return config;
  }

  const accessToken = token.accessToken.get();

  if (!accessToken) {
    return config;
  }

  (config.headers as AxiosRequestHeaders)['authorization'] = `Bearer ${accessToken}`;

  return config;
}
