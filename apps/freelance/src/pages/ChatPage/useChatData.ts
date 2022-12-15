import { useState } from 'react';
import { Form, FormInstance } from 'antd';
import useAppSelector from '@hooks/useAppSelector';
import {
  useGetConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from 'redux/services/chatApi';
import { useGetUserInfoQuery } from 'redux/services/user';
import { ConversationResponse, MessageResponse } from 'redux/types/chat.types';
import { User } from 'redux/types/user.types';

type MessageType = {
  token: string;
  conversation: number;
  message: string;
};

type InputType = {
  message: string;
};

type IConversation = number;

interface useChatDataReturns {
  user: User | undefined;
  chatMessages: MessageResponse[] | undefined;
  form: FormInstance<InputType>;
  conversation: number;
  ownerName: string;
  projectName: string;
  conversations: ConversationResponse[] | undefined;
  profileImg: string;
  handleSend: (values: InputType) => void;
  handleClick: (id: number) => number;
  onSearch: (value: string) => void;
}

const useChatData = (): useChatDataReturns => {
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const token = access_token;
  const [conversation, setConversation] = useState<IConversation>(1);
  const { data: user } = useGetUserInfoQuery();
  const [search, setSearch] = useState<string>();
  const { data: chatMessages } = useGetMessagesQuery({ token, conversation });
  const { data: conversations } = useGetConversationQuery({
    ...(search && { search }),
  });
  const [sendMessage] = useSendMessageMutation();
  const [form] = Form.useForm<InputType>();

  const currentConversation = conversations?.find(
    item => item.id === conversation,
  );
  const ownerName = `${currentConversation?.user.first_name} ${currentConversation?.user.last_name}`;
  const projectName = `${currentConversation?.job.title}`;
  const profileImg = `${currentConversation?.user.profile_image}`;

  const handleClick = (id: number) => {
    setConversation(id);

    return conversation;
  };

  const handleSend = (values: InputType) => {
    const message: MessageType = {
      token: access_token,
      conversation: conversation,
      message: values.message,
    };
    message.token && sendMessage(message);
  };

  const onSearch = (value: string) => {
    setSearch(value.trim());
  };

  return {
    user,
    chatMessages,
    form,
    projectName,
    ownerName,
    conversation,
    conversations,
    profileImg,
    handleSend,
    handleClick,
    onSearch,
  };
};

export default useChatData;
