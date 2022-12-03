import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined, LikeOutlined, CommentOutlined, HeartTwoTone } from '@ant-design/icons';
import { Typography, Divider, Popover, message } from 'antd';
import HashtagList from 'components/hashtag/HashtagList';
import PostCardButton from 'components/post/postCard/PostCardButton';
import PostCardCommentBox from 'components/post/postCard/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/PostCardCommentList';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import { PostsService } from '../../../api/services';
import { loginInfoState } from '../../auth/SignInForm';
import PostCardCarousel from './PostCardCarousel';
import PostEditDropdown from './PostEditDropdown';

const { Text } = Typography;

const PostCard = ({
  post: {
    userInfo,
    textContent,
    likeCount,
    hashtags,
    comments,
    postId,
    createdDate,
    updatedDate,
    fileDownloadUrls,
    likeUp,
  },
}) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [postTimeInfo, setPostTimeInfo] = useState('');
  const loginInfo = useRecoilValue(loginInfoState);
  const [likedButtonState, setLikedButtonState] = useState({});
  const handleCommentBox = () => setIsOpenCommentBox((prev) => !prev);
  useEffect(() => {
    if (likeUp) {
      setLikedButtonState({ isLiked: likeUp, type: 'link' });
    } else {
      setLikedButtonState({ isLiked: likeUp, type: 'text' });
    }
  }, [likeUp]);

  const onClickLikeBox = useCallback(async () => {
    if (likedButtonState.isLiked) {
      await PostsService.addLikeToPost({ postId }).catch((err) => message.error(err));
      setLikedButtonState(({ isLiked }) => {
        return { isLiked: !isLiked, type: 'link' };
      });
    } else {
      await PostsService.removeLikeToPost({ postId }).catch((err) => message.error(err));
      setLikedButtonState(({ isLiked }) => {
        return { isLiked: !isLiked, type: 'default' };
      });
    }
  }, [likedButtonState.isLiked, postId]);
  useEffect(() => {
    const postedDate = new Date(createdDate).toLocaleString();
    setPostTimeInfo(createdDate.includes(updatedDate) ? postedDate : postedDate + ' (수정됨)');
  }, [createdDate, updatedDate]);

  return (
    <div key={shortid.generate()} className="card">
      <PostCardCarousel images={fileDownloadUrls} />
      <section className="px-4 pt-4 pb-2">
        <div className="flex items-center pb-0.5 justify-between">
          <div>
            <UserOutlined size="32px" />
            <Text>{userInfo.username}</Text>
          </div>
          {userInfo.userId === loginInfo.userId && <PostEditDropdown postId={postId} />}
        </div>
        <div>
          <span className="text-xs text-gray-400">{postTimeInfo}</span>
        </div>
        <div>
          <Text className="pr-2">{textContent}</Text>
          <HashtagList tags={hashtags} />
        </div>
      </section>

      <section className="flex gap-x-1 items-center px-4 pb-3">
        <Popover placement="top" content="해당 게시글의 좋아요 갯수입니다." className="cursor-pointer">
          <HeartTwoTone style={{ fontSize: '1.1rem' }} />
        </Popover>
        <Text>{likeCount}</Text>
      </section>
      <Divider className="m-0" />

      <section className="flex interact-space">
        <PostCardButton onClick={onClickLikeBox} type={likedButtonState.type}>
          <LikeOutlined className="pr-1" />
          <Text>좋아요</Text>
        </PostCardButton>
        <PostCardButton onClick={handleCommentBox}>
          <CommentOutlined className="pr-1" />
          <Text>{isOpenCommentBox ? '댓글 닫기' : '댓글 달기'}</Text>
        </PostCardButton>
      </section>

      <Divider className="m-0" />

      <PostCardCommentBox open={isOpenCommentBox} />
      <PostCardCommentList comments={comments} />
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    // images: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      email: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    textContent: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        articleId: PropTypes.number.isRequired,
        replyUserId: PropTypes.number.isRequired,
        textContent: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
          userId: PropTypes.number.isRequired,
          email: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ),
    createdDate: PropTypes.string,
    updatedDate: PropTypes.string,
    fileDownloadUrls: PropTypes.array.isRequired,
    likeUp: PropTypes.bool,
  }).isRequired,
};

export default PostCard;
