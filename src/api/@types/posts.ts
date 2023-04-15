import { Empty } from 'api/@types/@shared';
import { FileInfo } from 'api/@types/file';
import { User } from 'api/@types/users';

export interface Post {
  id: number;
  userInfo: User;
  textContent: string;
  commentCount: number;
  hashtags: string[];
  likeCount: number;
  files: FileInfo[];
  createdDate: string;
  updatedDate: string;
  likeUp: boolean;
}

export interface CreatePostRequest {
  textContent: string;
  hashtags: string[];
  imageIds: number[];
}

export interface UpdatePostRequest {
  postId: number;
  textContent: string;
  hashtags: string[];
  imageIds: number[];
}

export interface DeletePostRequest {
  postId: number;
}

export interface GetPostRequest {
  postId: number;
}

export interface GetPostsRequest {
  cursorId: number | null;
}

export interface GetPostsByHashtagsRequest {
  cursorId: number | null;
  hashtags: string[];
}

export interface LikePostRequest {
  postId: number;
}

export interface LikePostResponse {
  count: number;
}

export interface UnlikePostRequest {
  postId: number;
}

export interface UnlikePostResponse {
  count: number;
}

export interface PostsServiceClient {
  /**
   * 게시글을 생성합니다.
   */
  createPost(request: CreatePostRequest): Promise<Post>;

  /**
   * 게시글을 수정합니다. 수정되지 않을 데이터를 포함해서 모든 게시글 양식을 전달받습니다. (put)
   */
  updatePost(request: UpdatePostRequest): Promise<Post>;

  /**
   * 사용자가 작성한 게시글이 맞는 지 검증하고 게시글을 삭제합니다.
   */
  deletePost(request: DeletePostRequest): Promise<Empty>;

  /**
   * 필터링 없이 모든 게시글을 생성 일자 순으로 가져옵니다 (페이지네이션을 지원합니다).
   */
  getPosts(request: GetPostsRequest): Promise<Post[]>;

  /**
   * 로그인 된 사용자의 게시글을 생성 일자 순으로 가져옵니다 (페이지네이션을 지원합니다). page, size 옵션을 완전 배제할 경우 모든 게시글을 반환합니다.
   */
  getUserPosts(request: GetPostsRequest): Promise<Post[]>;

  /**
   * 해시태그 값들을 받아서, 대응하는 게시글을 반환합니다.
   */
  getPostsByHashtags(request: GetPostsByHashtagsRequest): Promise<Post[]>;

  /**
   * 토큰 정보로 해당 게시글에 좋아요를 수행합니다. 중복 좋아요 안됩니다.
   */
  likePost(request: LikePostRequest): Promise<LikePostResponse>;

  /**
   * 토큰 정보로 해당 게시글 좋아요 정보를 취소합니다.
   */
  unlikePost(request: UnlikePostRequest): Promise<UnlikePostResponse>;
}
