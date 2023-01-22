import { Empty } from 'api/@types/@shared';
import { UserDetail } from 'api/@types/user';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  realname: string;
  phoneNumber: string;
}

export interface CreateUserResponse {
  tokenInfo: Token;
  userUnitedInfo: UserDetail;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  tokenInfo: Token;
  userUnitedInfo: UserDetail;
}

export interface CodeCheckRequest {
  code: string;
}

export interface FindEmailFirstStepRequest {
  phoneNumber: string;
}

export interface FindEmailSecondStepResponse {
  email: string;
}

export interface FindPasswordFirstStepRequest {
  email: string;
  phoneNumber: string;
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
   * 이메일 찾기 요청 step 1
   */
  findEmailFirstStep(request: FindEmailFirstStepRequest): Promise<Empty>;

  /**
   * 이메일 찾기 요청 step 2
   */
  findEmailSecondStep(request: CodeCheckRequest): Promise<FindEmailSecondStepResponse>;

  /**
   * 비밀번호 찾기 요청 step 1
   */
  findPasswordFirstStep(request: FindPasswordFirstStepRequest): Promise<Empty>;

  /**
   * 비밀번호 찾기 요청 step 2
   */
  findPasswordSecondStep(request: CodeCheckRequest): Promise<Empty>;

  /**
   * refreshToken 을 헤더에 포함시켜 accessToken 을 새로 발급 받습니다.
   */
  reIssueAccessToken(request: ReIssueAccessTokenRequest): Promise<ReIssueAccessTokenResponse>;
}
