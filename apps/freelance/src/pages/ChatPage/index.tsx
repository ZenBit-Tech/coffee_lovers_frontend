import { Avatar, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { InputSearch, StyledInput } from '@freelance/components';
import { formatDate, formatTime } from 'src/utils/dates';

import { users } from './constants';
import {
  BottomWrapper,
  FirstUserContainer,
  FirstUserText,
  HeaderContainer,
  MessagesWrapper,
  SecondUserContainer,
  SecondUserText,
  StyledButton,
  StyledFormItem,
  StyledLeftSide,
  StyledRightSide,
  UserWrapper,
} from './styles';
import useChatData from './useChatData';

const ChatPage = () => {
  const { t } = useTranslation();
  const { user, chatMessages, form, handleSend } = useChatData();

  return (
    <Row>
      <StyledLeftSide span={6}>
        <InputSearch placeholder={t('findJobs.searchPlaceholder')} />
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <UserWrapper>
                  <Avatar size={40} icon={<UserOutlined />} />
                  <p>{user.name}</p>
                </UserWrapper>
              </li>
            );
          })}
        </ul>
      </StyledLeftSide>
      <StyledRightSide span={18}>
        <HeaderContainer>
          <h2>{t('chat.project')}</h2>
          <h2>{t('chat.user')}</h2>
        </HeaderContainer>
        <MessagesWrapper>
          {chatMessages &&
            chatMessages.map(item =>
              user?.email === item.from.email ? (
                <FirstUserContainer>
                  <p>
                    {user.first_name} {user.last_name}{' '}
                    {formatDate(new Date(item.created_at))}{' '}
                    {formatTime(new Date(item.created_at))}
                  </p>
                  <FirstUserText>{item.message}</FirstUserText>
                </FirstUserContainer>
              ) : (
                <SecondUserContainer>
                  <p>
                    {item.from.first_name} {item.from.last_name}{' '}
                    {formatDate(new Date(item.created_at))}{' '}
                    {formatTime(new Date(item.created_at))}
                  </p>
                  <SecondUserText> {item.message}</SecondUserText>
                </SecondUserContainer>
              ),
            )}
        </MessagesWrapper>

        <Form form={form} layout="inline" onFinish={handleSend}>
          <BottomWrapper>
            <StyledFormItem name="message" rules={[{ required: true }]}>
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
