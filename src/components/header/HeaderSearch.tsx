import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';

import { useModal } from 'hooks/useModal';
import { hashtagsParser } from 'utils/hashtagParser';

const HeaderSearch: React.FC = () => {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();
  const inputRef = useRef(null);

  const onSearch = useCallback(
    (searchText: string) => {
      if (!searchText) {
        return;
      }

      const hashtags = searchText.match(/#+[가-힣ㄱ-ㅎa-zA-Z0-9]+/g);

      if (!hashtags) {
        return message.error('해시태그로 검색해주세요.');
      }

      const filteredHashTags = [...new Set(hashtags.map((v) => v.replace(/#{2,}/g, '#')))];

      if (filteredHashTags.length > 5) {
        return message.error('해시태그는 5개 이상 검색할 수 없습니다.');
      }

      router.push({
        pathname: '/search',
        query: { hashtags: hashtagsParser.serialize(filteredHashTags) },
      });
    },
    [router]
  );

  return (
    <>
      <Button className="no-padding" shape="circle" icon={<SearchOutlined />} onClick={openModal} />

      <Modal title="해쉬태그 검색" open={isModalOpen} onCancel={closeModal} footer={null} centered destroyOnClose>
        <Input.Search ref={inputRef} placeholder="#개발 #개발자" size="large" onSearch={onSearch} />
      </Modal>
    </>
  );
};

export default HeaderSearch;
