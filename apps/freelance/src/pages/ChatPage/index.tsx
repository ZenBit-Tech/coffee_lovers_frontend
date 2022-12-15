import { Avatar, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  InputSearch,
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
  MessagesWrapper,
  SecondUserContainer,
  SecondUserText,
  SendOfferBtn,
  StyledButton,
  StyledFormItem,
  StyledLeftSide,
  StyledRightSide,
  UnreadStyled,
  UserWrapper,
} from './styles';
import useChatData from './useChatData';

const ChatPage = () => {
  const { t } = useTranslation();

  const {
    user,
    chatMessages,
    form,
    ownerName,
    projectName,
    conversation,
    conversations,
    profileImg,
    handleSend,
    handleClick,
    onSearch,
  } = useChatData();

  return (
    <Row>
      <StyledLeftSide span={6}>
        <InputSearch
          placeholder={t('findJobs.searchPlaceholder')}
          onSearch={onSearch}
        />
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
                <Avatar size={defaultAvatarSize} icon={<UserOutlined />} />
                <div>
                  {user?.role === roles.jobOwner && <p>{item.job.title}</p>}
                  <p>
                    {item.user.first_name} {item.user.last_name}
                  </p>
                </div>

                {item.new_messages > 0 && (
                  <UnreadStyled>
                    <p>{item.new_messages} </p>
                  </UnreadStyled>
                )}
              </UserWrapper>
            </li>
          ))}
        </ul>
      </StyledLeftSide>
      <StyledRightSide span={18}>
        <HeaderContainer>
          {user?.role === roles.jobOwner && (
            <Avatar
              src={`${baseUrl}/${profileImg}`}
              size={defaultAvatarSize}
              icon={<UserOutlined />}
            />
          )}
          <>
            <h2>{ownerName} </h2>
            <h2>{projectName}</h2>
          </>
          {user?.role === roles.jobOwner && (
            <SendOfferBtn>{t('chat.sendOffer')}</SendOfferBtn>
          )}
        </HeaderContainer>
        <MessagesWrapper>
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
                      <p>
                        {item.from.first_name} {item.from.last_name}{' '}
                        {formatDate(new Date(item.created_at))}{' '}
                        {formatTime(new Date(item.created_at))}
                      </p>
                      <SecondUserText> {item.message}</SecondUserText>
                    </SecondUserContainer>
                  </li>
                ),
              )}
          </ul>
        </MessagesWrapper>

        <Form form={form} layout="inline" onFinish={handleSend}>
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
        </Form>
      </StyledRightSide>
    </Row>
  );
};
export default ChatPage;
