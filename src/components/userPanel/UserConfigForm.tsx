import React, { useCallback } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useRecoilState } from 'recoil';

import { UpdateMeRequest, UserDetail } from 'api/@types/user';
import { UserService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import atomStore from 'stores/atom';
import { requiredRule } from 'utils/formRules';
import { phoneNumberRegex, realnameRegex, usernameRegex } from 'utils/regex';

interface FormValues extends UpdateMeRequest {}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const UserConfigForm: React.FC = () => {
  const [me, setMe] = useRecoilState(atomStore.meAtom);
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [messageApi, contextHolder] = message.useMessage();

  const submitUserConfig = useCallback(
    async (values: FormValues) => {
      try {
        // setLoading(true);
        const updated = await UserService.updateMe(values);
        setMe((prev) => ({
          ...(prev as UserDetail),
          userInfo: updated,
        }));
        messageApi.success('사용자 정보가 변경되었습니다.');
      } catch (error) {
        messageApi.error(error.message);
      } finally {
        // setLoading(false);
      }
    },
    [messageApi, setMe]
  );

  return (
    <>
      {contextHolder}
      <section className="w-full">
        <Form<FormValues>
          onFinish={submitUserConfig}
          validateTrigger={formValidateTrigger}
          onFinishFailed={onFormFinishFailed}
          scrollToFirstError
          initialValues={{
            email: me?.userInfo.email,
            username: me?.userInfo.username,
            realname: me?.userInfo.realname,
          }}
          {...layout}
        >
          <Form.Item
            name="email"
            label="이메일"
            hasFeedback={hasFeedback}
            rules={[{ type: 'email', message: '올바른 이메일을 입력해주세요' }, requiredRule]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="username"
            label="사용자 아이디"
            hasFeedback={hasFeedback}
            rules={[
              requiredRule,
              {
                pattern: usernameRegex,
                message: '4~15자 영문 대 소문자, 숫자, 밑줄을 사용하세요. 최소 한개의 영문이 포함되어야 합니다',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="realname"
            label="실명"
            hasFeedback={hasFeedback}
            rules={[
              requiredRule,
              {
                pattern: realnameRegex,
                message: '1~12자 영문 대 소문자, 한글을 사용하세요',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="전화번호"
            hasFeedback={hasFeedback}
            tooltip="하이픈(-)없이 숫자만 입력하세요."
            rules={[
              requiredRule,
              {
                pattern: phoneNumberRegex,
                message: '하이픈(-)없이 9~11자 숫자를 사용하세요',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            변경하기
          </Button>
        </Form>
      </section>
    </>
  );
};

export default UserConfigForm;
