import { Empty } from 'api/@types/@shared';

export interface User {
  id: number;
  email: string;
  username: string;
  realname: string;
  createdDate: string;
  updatedDate: string;
}

export interface UserSimple {
  username: string;
  realname: string;
}

export interface UserDetail {
  allPostCount: number;
  allFollowerCount: number;
  allFollowingCount: number;
  allGivenLikeCount: number;
  userInfo: User;
}

export interface GetUserRequest {
  username: string;
}

export interface UpdateMeRequest {
  email: string;
  username: string;
  realname: string;
}

export interface UpdateMyPasswordRequest {
  prevPassword: string;
  newPassword: string;
}

export interface DeleteMeRequest {
  password: string;
}

export interface GetFollowersByUsernameRequest {
  username: string;
}

export interface GetFollowingsByUsernameRequest {
  username: string;
}

export interface FollowRequest {
  username: string;
}

export interface UnFollowRequest {
  username: string;
}

export interface CheckFollowRequest {
  username: string;
}

export interface CheckFollowingRequest {
  username: string;
}

export interface UserServiceClient {
  /**
   * 내 정보 반환
   */
  getMe(): Promise<UserDetail>;

  /**
   * 특정 사용자 정보 반환
   */
  getUser(request: GetUserRequest): Promise<UserDetail>;

  /**
   * 내 정보 업데이트
   */
  updateMe(request: UpdateMeRequest): Promise<User>;

  /**
   * 패스워드 업데이트
   */
  updateMyPassword(request: UpdateMyPasswordRequest): Promise<Empty>;

  /**
   * 탈퇴
   */
  deleteMe(request: DeleteMeRequest): Promise<Empty>;

  /**
   * 내 팔로워들 반환
   */
  getMyFollowers(): Promise<UserSimple[]>;

  /**
   * 내 팔로잉들 반환
   */
  getMyFollowings(): Promise<UserSimple[]>;

  /**
   * 특정 사용자의 팔로우들 반환
   */
  getFollowersByUsername(request: GetFollowersByUsernameRequest): Promise<UserSimple[]>;

  /**
   * 특정 사용자의 팔로잉들 반환
   */
  getFollowingsByUsername(request: GetFollowingsByUsernameRequest): Promise<UserSimple[]>;

  /**
   * 팔로우
   */
  follow(request: FollowRequest): Promise<Empty>;

  /**
   * 팔로우 취소
   */
  unFollow(request: UnFollowRequest): Promise<Empty>;

  /**
   * 내가 해당 유저가 팔로우했는지 체크
   */
  checkFollow(request: CheckFollowRequest): Promise<boolean>;

  /**
   * 특정 유저가 나를 팔로잉했는지 체크
   */
  checkFollowing(request: CheckFollowingRequest): Promise<boolean>;
}
