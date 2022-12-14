import { useEffect, useState } from 'react';
import { Avatar, Badge, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  OfferFromChatModal,
  roles,
  StyledInput,
} from '@freelance/components';
import { baseTheme } from 'src/styles/theme';
import { formatDate, formatTime } from 'src/utils/dates';

import { colors, defaultAvatarSize, message } from './constants';
import {
  BottomWrapper,
  FirstUserContainer,
  FirstUserText,
  HeaderContainer,
  InputSearchStyled,
  MessagesWrapper,
  SecondUserContainer,
  SecondUserText,
  SendOfferBtn,
  StyledButton,
  StyledFormItem,
  StyledLeftSide,
  StyledRightSide,
  StyledText,
  StyledWrapper,
  UserDateStyled,
  UserDivStyled,
  UserWrapper,
} from './styles';
import useChatData from './useChatData';

const { Text } = Typography;

type Open = boolean;

const ChatPage = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<Open>(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const {
    user,
    chatMessages,
    form,
    conversation,
    conversations,
    currentConversationInfo,
    handleSend,
    handleClick,
    onSearch,
  } = useChatData();

  useEffect(() => {
    const el = document.getElementById('messages');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Row>
      <StyledLeftSide span={6}>
        <InputSearchStyled
          placeholder={t('findJobs.searchPlaceholder')}
          onSearch={onSearch}
        />
        {conversations && conversations.length > 0 && (
          <ul>
            {conversations?.map(item => (
              <li key={item.id} onClick={() => handleClick(item.id)}>
                <UserWrapper
                  color={
                    item.id === conversation
                      ? baseTheme.colors.white
                      : colors.transparent
                  }
                >
                  <Badge
                    color={baseTheme.colors.primary}
                    count={item.new_messages}
                  >
                    <Avatar
                      src={`${baseUrl}/${item.user.profile_image}`}
                      size={defaultAvatarSize}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                  <UserDivStyled>
                    {user?.role === roles.jobOwner && (
                      <StyledText ellipsis={true}>{item.job.title}</StyledText>
                    )}
                    <Text strong>
                      {item.user.first_name} {item.user.last_name}
                    </Text>
                  </UserDivStyled>
                </UserWrapper>
              </li>
            ))}
          </ul>
        )}
      </StyledLeftSide>
      <StyledRightSide span={18}>
        <HeaderContainer>
          {conversation !== 0 ? (
            <>
              {user?.role === roles.jobOwner && (
                <Avatar
                  src={`${baseUrl}/${currentConversationInfo.profileImg}`}
                  size={defaultAvatarSize}
                  icon={<UserOutlined />}
                />
              )}
              <div>
                <h2>{currentConversationInfo.ownerName}</h2>
                <p>
                  {t('chat.projectTitle')} {currentConversationInfo.jobTitle}
                </p>
              </div>

              {user?.role === roles.jobOwner && (
                <SendOfferBtn onClick={showModal}>
                  {t('chat.sendOffer')}
                </SendOfferBtn>
              )}
            </>
          ) : (
            <h2>{t('chat.chooseChat')}</h2>
          )}
        </HeaderContainer>

        <StyledWrapper>
          <MessagesWrapper id="messages">
            <ul>
              {chatMessages &&
                chatMessages.map(item =>
                  user?.email === item.from.email ? (
                    <li key={item.created_at}>
                      <FirstUserContainer>
                        <p>
                          {user.first_name} {user.last_name}{' '}
                          {formatDate(new Date(item.created_at))}{' '}
                          {formatTime(new Date(item.created_at))}
                        </p>
                        <FirstUserText>{item.message}</FirstUserText>
                      </FirstUserContainer>
                    </li>
                  ) : (
                    <li key={item.created_at}>
                      <SecondUserContainer>
                        <UserDateStyled>
                          {item.from.first_name} {item.from.last_name}{' '}
                          {formatDate(new Date(item.created_at))}{' '}
                          {formatTime(new Date(item.created_at))}
                        </UserDateStyled>
                        <SecondUserText> {item.message}</SecondUserText>
                      </SecondUserContainer>
                    </li>
                  ),
                )}
            </ul>
          </MessagesWrapper>
        </StyledWrapper>

        <Form form={form} layout="inline" onFinish={handleSend}>
          {!!conversation && (
            <BottomWrapper>
              <StyledFormItem name={message} rules={[{ required: true }]}>
                <StyledInput placeholder={t('chat.message')} />
              </StyledFormItem>

              <Form.Item>
                <StyledButton type="primary" htmlType="submit">
                  {t('chat.send')}
                </StyledButton>
              </Form.Item>
            </BottomWrapper>
          )}
        </Form>
      </StyledRightSide>
      <OfferFromChatModal
        openModal={openModal}
        onCancel={onCancel}
        currentConversationInfo={currentConversationInfo}
      />
    </Row>
  );
};
export default ChatPage;
