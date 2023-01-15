import { AxiosRequestConfig } from 'axios';

const color = {
  info: '#0490C8',
  success: '#22bb33',
  warn: '#DE793B',
  error: '#C73333',
};

type PrintRequestLogParams = {
  method?: string;
  endPoint?: string;
  requestObj?: Record<string, unknown>;
  config: AxiosRequestConfig;
};
export function printRequestLog({ method, endPoint, requestObj, config }: PrintRequestLogParams) {
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [REQ BODY]`,
    `color: ${color.info};font-weight: bold;`,
    requestObj ?? ''
  );
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [REQ HEADERS]`,
    `color: ${color.info};font-weight: bold;`,
    config.headers
  );
  console.log(`%c${method?.toUpperCase()} ${endPoint} [REQ CONFIG]`, `color: ${color.info};font-weight: bold;`, config);
}

type PrintResponseLogParams = {
  method?: string;
  endPoint?: string;
  responseObj?: Record<string, unknown>;
};
export function printResponseLog({ method, endPoint, responseObj }: PrintResponseLogParams) {
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [RES BODY]`,
    `color: ${color.success};font-weight: bold`,
    responseObj
  );
}

type PrintErrorLogParams = {
  method?: string;
  endPoint?: string;
  errorMessage?: string;
  errorObj?: Record<string, unknown>;
};
export function printErrorLog({ method, endPoint, errorMessage, errorObj }: PrintErrorLogParams) {
  console.log(
    `%c${method?.toUpperCase()} ${endPoint} [ERR]`,
    `color: ${color.error};font-weight: bold`,
    errorMessage,
    errorObj
  );
}
