import { AxiosRequestConfig } from 'axios';

type ApiQueryMethod = <Res>(route: string, config?: AxiosRequestConfig) => Promise<Res>;
type ApiBodyMethod = <Req, Res>(route: string, body?: Req, config?: AxiosRequestConfig) => Promise<Res>;

export interface ApiMethods {
  get: ApiQueryMethod;
  head: ApiQueryMethod;
  delete: ApiBodyMethod;
  post: ApiBodyMethod;
  put: ApiBodyMethod;
  patch: ApiBodyMethod;
}

export interface Empty {}
