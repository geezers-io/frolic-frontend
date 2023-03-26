import { Empty } from 'api/@types/@shared';
import { User } from 'api/@types/users';

export interface CommentInfo {
  id: number;
  postId: number;
  // replyUserId: number;
  textContent: string;
  userInfo: User;
}

export interface CreateCommentRequest {
  postId: number;
  textContent: string;
}

export interface UpdateCommentRequest {
  commentId: number;
  postId: number;
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
  createComment(request: CreateCommentRequest): Promise<CommentInfo>;

  /**
   * 댓글을 수정합니다.
   */
  updateComment(request: UpdateCommentRequest): Promise<CommentInfo>;

  /**
   * 댓글 상세 정보를 조회합니다.
   */
  getCommentDetail(request: GetCommentDetailRequest): Promise<CommentInfo>;

  /**
   * 댓글을 삭제합니다.
   */
  deleteComment(request: DeleteCommentRequest): Promise<Empty>;

  /**
   * 특정 게시글의 모든 댓글을 조회합니다.
   */
  getCommentsByPostId(request: GetCommentsByPostIdRequest): Promise<CommentInfo[]>;

  /**
   * 사용자의 모든 댓글을 조회합니다.
   */
  getCommentsByUsername(request: GetCommentsByUsernameIdRequest): Promise<CommentInfo[]>;
}
