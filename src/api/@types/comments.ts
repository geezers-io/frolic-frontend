import { Empty } from 'api/@types/@shared';
import { User } from 'api/@types/user';

export interface Comment {
  id: number;
  postId: number;
  // replyUserId: number;
  textContent: string;
  userInfo: User;
}

export interface CreateCommentRequest {
  postId: number;
  postOwnerId: number;
  // replyUserId: number;
  textContent: string;
}

export interface UpdateCommentRequest {
  commentId: number;
  postId: number;
  postOwnerId: number;
  // replyUserId: number;
  textContent: string;
}

export interface GetCommentDetailRequest {
  commentId: number;
}

export interface DeleteCommentRequest {
  commentId: number;
}

export interface GetCommentsByPostIdRequest {
  postId: number;
}

export interface GetCommentsByUsernameIdRequest {
  username: string;
}

export interface CommentsServiceClient {
  /**
   * 댓글을 작성합니다.
   */
  createComment(request: CreateCommentRequest): Promise<Comment>;

  /**
   * 댓글을 수정합니다.
   */
  updateComment(request: UpdateCommentRequest): Promise<Comment>;

  /**
   * 댓글 상세 정보를 조회합니다.
   */
  getCommentDetail(request: GetCommentDetailRequest): Promise<Comment>;

  /**
   * 댓글을 삭제합니다.
   */
  deleteComment(request: DeleteCommentRequest): Promise<Empty>;

  /**
   * 특정 게시글의 모든 댓글을 조회합니다.
   */
  getCommentsByPostId(request: GetCommentsByPostIdRequest): Promise<Comment[]>;

  /**
   * 사용자의 모든 댓글을 조회합니다.
   */
  getCommentsByUsername(request: GetCommentsByUsernameIdRequest): Promise<Comment[]>;
}
