import { Form, FormInstance } from 'antd';
import useAppSelector from '@hooks/useAppSelector';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from 'redux/services/chatApi';
import { useGetUserInfoQuery } from 'redux/services/user';
import { MessageResponse } from 'redux/types/chat.types';
import { User } from 'redux/types/user.types';

import { conversation } from './constants';

type MessageType = {
  token: string;
  conversation: number;
  message: string;
};

type InputType = {
  message: string;
};

interface useChatDataReturns {
  user: User | undefined;
  chatMessages: MessageResponse[] | undefined;
  form: FormInstance<InputType>;
  handleSend: (values: InputType) => void;
}

const useChatData = (): useChatDataReturns => {
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const token = access_token;
  const { data: user } = useGetUserInfoQuery();
  const { data: chatMessages } = useGetMessagesQuery({ token, conversation });
  const [sendMessage] = useSendMessageMutation();
  const [form] = Form.useForm<InputType>();

  const handleSend = (values: InputType) => {
    const message: MessageType = {
      token: access_token,
      conversation: conversation,
      message: values.message,
    };
    message.token && sendMessage(message);
  };

  return {
    user,
    chatMessages,
    form,
    handleSend,
  };
};

export default useChatData;
