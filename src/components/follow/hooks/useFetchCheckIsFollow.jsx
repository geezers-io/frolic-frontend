import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { UserService } from '../../../api/services';

const useFetchCheckIsFollow = ({ username }) => {
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const isFollow = await UserService.checkFollow({ username });
        console.log({ isFollow });
        setIsFollow(isFollow);
      } catch (e) {
        message.error(e);
      }
    })();
  }, [username]);

  return { isFollow, setIsFollow };
};

useFetchCheckIsFollow.propTypes = {
  username: PropTypes.string.isRequired,
};

export default useFetchCheckIsFollow;
