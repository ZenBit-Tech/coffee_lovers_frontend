import { Avatar, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { InputSearch, StyledInput } from '@freelance/components';
import useAppSelector from '@hooks/useAppSelector';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from 'redux/services/chatApi';
import { useGetUserInfoQuery } from 'redux/services/user';
import { formatDate, formatTime } from 'src/utils/dates';

import { conversation, users } from './constants';
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

type InputType = {
  message: string;
};

type MessageType = {
  token: string;
  conversation: number;
  message: string;
};

const ChatPage = () => {
  const { t } = useTranslation();
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const token = access_token;
  const { data: dataUser } = useGetUserInfoQuery();
  const { data: dataMessages } = useGetMessagesQuery({ token, conversation });
  const [form] = Form.useForm<InputType>();
  const [sendMessage] = useSendMessageMutation();
  console.log(dataMessages);

  const handleSend = (values: InputType) => {
    const message: MessageType = {
      token: access_token,
      conversation: conversation,
      message: values.message,
    };
    console.log(values.message);
    message.token && sendMessage(message);
  };

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
          {dataMessages &&
            dataMessages.map(item =>
              dataUser?.email === item.from.email ? (
                <FirstUserContainer>
                  <p>
                    {dataUser.first_name} {dataUser.last_name}{' '}
                    {formatDate(new Date(item.created_at))}{' '}
                    {formatTime(new Date(item.created_at))}
                  </p>
                  <FirstUserText> {item.message}</FirstUserText>
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
