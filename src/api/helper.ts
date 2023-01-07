import { AxiosError, AxiosRequestConfig } from 'axios';

import { ApiMethods } from 'api/@types/@shared';

import { ENDPOINT_LIST, MODE_NAME_LIST } from './constant';

export function getRequestArgs(
  method: keyof ApiMethods,
  route: string,
  body: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
) {
  switch (method) {
    case 'get':
    case 'delete':
    case 'head':
      return [route, config] as const;
    case 'post':
    case 'put':
    case 'patch':
      return [route, body, config] as const;
  }
}

export function getErrorMessage(e: AxiosError) {
  const data = e.response?.data ?? e.config?.data;

  return (
    data?.data?.message /* server error */ ??
    data?.data?.error /* server error */ ??
    data?.error?.message /* server error */ ??
    data?.error /* server error */ ??
    data?.message /* http error */ ??
    data?.error /* http error */ ??
    e.message /* http error */ ??
    'Unknown error occurred'
  );
}

export function getServerUrlByMode(mode = MODE_NAME_LIST.TEST) {
  switch (mode) {
    case MODE_NAME_LIST.DEVELOPMENT:
      return ENDPOINT_LIST.DEVELOPMENT;
    case MODE_NAME_LIST.PRODUCTION:
      throw Error('배포 환경이 정의되지 않았습니다.');
    case MODE_NAME_LIST.TEST:
      return ENDPOINT_LIST.TEST;
    default:
      return ENDPOINT_LIST.DEVELOPMENT;
  }
}
