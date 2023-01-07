import { Empty } from 'api/@types/@shared';
import { UserDetail } from 'api/@types/user';

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  realname: string;
}

export interface CreateUserResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserDetail;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserDetail;
}

export interface ReIssueAccessTokenRequest {
  refreshToken: string;
}

export interface ReIssueAccessTokenResponse {
  accessToken: string;
}

export interface AuthServiceClient {
  /**
   * 사용자 회원가입 요청
   */
  createUser(request: CreateUserRequest): Promise<CreateUserResponse>;

  /**
   * 로그인 요청 후 성공 시 토큰 값을 반환받습니다.
   */
  login(request: LoginRequest): Promise<LoginResponse>;

  /**
   * 로그아웃
   */
  logout(): Promise<Empty>;

  /**
   * refreshToken 을 헤더에 포함시켜 accessToken 을 새로 발급 받습니다.
   */
  reIssueAccessToken(request: ReIssueAccessTokenRequest): Promise<ReIssueAccessTokenResponse>;
}
