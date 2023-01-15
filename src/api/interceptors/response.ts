import { AxiosError, AxiosResponse } from 'axios';

import { getErrorMessage } from 'api/helper';
import { printErrorLog, printResponseLog } from 'utils/log';

export function logResponse(response: AxiosResponse) {
  const {
    config: { url, method },
    data,
  } = response;

  printResponseLog({
    method,
    endPoint: url,
    responseObj: data,
  });

  return response;
}

export function logError(e: AxiosError) {
  const url = e.config?.url;
  const method = e.config?.method;

  const errorMessage = getErrorMessage(e);

  printErrorLog({
    method,
    endPoint: url,
    errorMessage,
    errorObj: e,
  });

  return Promise.reject(e);
}
