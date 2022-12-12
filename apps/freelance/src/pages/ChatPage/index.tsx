import React from 'react';
import { Avatar, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { InputSearch, PrimaryButton, StyledInput } from '@freelance/components';

import { users } from './constants';
import {
  BottomWrapper,
  StyledLeftSide,
  StyledRightSide,
  UserWrapper,
  Wrapper,
} from './styles';

const ChatPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <h2>Chat</h2>
      <Row>
        <StyledLeftSide span={6}>
          <InputSearch
            placeholder={t('findJobs.searchPlaceholder')}
            onSearch={() => console.log('Search')}
          />
          {users.map(user => {
            return (
              <UserWrapper>
                <Avatar size={40} icon={<UserOutlined />} />
                <p>{user.name}</p>
              </UserWrapper>
            );
          })}
        </StyledLeftSide>
        <StyledRightSide span={18}>
          <BottomWrapper>
            <StyledInput placeholder="message" />
            <PrimaryButton>Send</PrimaryButton>
          </BottomWrapper>
        </StyledRightSide>
      </Row>
    </Wrapper>
  );
};
export default ChatPage;
