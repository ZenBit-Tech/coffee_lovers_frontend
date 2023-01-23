import { Avatar, Badge, Empty, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  OfferFromChatModal,
  roles,
  StyledInput,
  useOpenNotification,
} from '@freelance/components';
import { baseTheme } from 'src/styles/theme';
import { formatDate, formatTime } from 'src/utils/dates';

import { colors, defaultAvatarSize, message } from './constants';
import { ReceivedOfferModal } from './receivedOffer';
import {
  BottomWrapper,
  ContactsList,
  EmptyDataWrapper,
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

const { Text, Title } = Typography;

const ChatPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const {
    user,
    chatMessages,
    form,
    conversation,
    conversations,
    currentConversationInfo,
    pendingOffer,
    offer,
    openModal,
    openReceivedOfferModal,
    showReceivedOfferModal,
    onCancel,
    showModal,
    sendOfferButtonShow,
    handleSend,
    handleClick,
    onSearch,
  } = useChatData(location.state);
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const messageValue = Form.useWatch('message', form);

  return (
    <Row>
      {contextHolder}
      <StyledLeftSide span={6}>
        <InputSearchStyled
          placeholder={t('findJobs.searchPlaceholder')}
          onSearch={onSearch}
        />
        {conversations && conversations.length > 0 && (
          <ContactsList>
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
                    <StyledText ellipsis={true}>{item.job.title}</StyledText>
                    <Text strong>
                      {item.user.first_name} {item.user.last_name}
                    </Text>
                  </UserDivStyled>
                </UserWrapper>
              </li>
            ))}
          </ContactsList>
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

              {user?.role === roles.jobOwner && sendOfferButtonShow() && (
                <SendOfferBtn onClick={showModal}>
                  {t('chat.sendOffer')}
                </SendOfferBtn>
              )}
              {user?.role === roles.freelancer && pendingOffer && (
                <SendOfferBtn onClick={showReceivedOfferModal}>
                  {t('chat.received_offer')}
                </SendOfferBtn>
              )}
            </>
          ) : (
            <EmptyDataWrapper>
              <Title level={2}>{t('chat.chooseChat')}</Title>
              <Empty imageStyle={{ height: 200 }} description={false} />
            </EmptyDataWrapper>
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
              <StyledFormItem name={message}>
                <StyledInput placeholder={t('chat.message')} />
              </StyledFormItem>

              <Form.Item>
                <StyledButton
                  type="primary"
                  htmlType="submit"
                  disabled={!messageValue}
                >
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
        openNotificationWithIcon={openNotificationWithIcon}
      />
      <ReceivedOfferModal
        openModal={openReceivedOfferModal}
        onCancel={onCancel}
        offer={offer}
        openNotificationWithIcon={openNotificationWithIcon}
      />
    </Row>
  );
};
export default ChatPage;
