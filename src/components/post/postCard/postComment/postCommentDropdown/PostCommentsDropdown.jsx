import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import { CommentsService } from 'api/services';
import { menuItems, menuKeys } from 'components/post/postCard/postComment/postCommentDropdown/constant';

const PostCommentsDropdown = ({ postId, commentId, ownerId, handleComments }) => {
  const handleDropdownClick = useCallback(
    async ({ key }) => {
      if (key === menuKeys.editComment) {
        try {
          CommentsService.updateComment({ postId, ownerId });
        } catch (err) {
          message.error(err);
        }
      }
      if (key === menuKeys.deleteComment) {
        try {
          await CommentsService.deleteComment({ commentId });

          handleComments((prv) => {
            return prv.filter((comment) => comment.commentId !== commentId);
          });

          message.success('댓글이 삭제되었습니다.');
        } catch (err) {
          message.error(err.message);
        }
      }
    },
    [commentId, handleComments, ownerId, postId]
  );
  return (
    <Dropdown menu={{ items: menuItems, onClick: handleDropdownClick }}>
      <Button className="p-0 no-padding" type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

PostCommentsDropdown.propTypes = {
  commentId: PropTypes.number,
  postId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  handleComments: PropTypes.func.isRequired,
};
export default PostCommentsDropdown;
