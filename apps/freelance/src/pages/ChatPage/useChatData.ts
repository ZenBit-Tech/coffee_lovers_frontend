import { useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import { useSearchParams } from 'react-router-dom';
import useAppSelector from '@hooks/useAppSelector';
import {
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from 'redux/services/chatApi';
import { useGetUserInfoQuery } from 'redux/services/user';
import {
  ConversationResponse,
  ICurrentConversationInfo,
  MessageResponse,
} from 'redux/types/chat.types';
import { User } from 'redux/types/user.types';

import { jobSearchParam, userSearchParam, zero } from './constants';

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
  user?: User;
  chatMessages?: MessageResponse[];
  form: FormInstance<InputType>;
  conversation: number;
  conversations?: ConversationResponse[];
  currentConversationInfo: ICurrentConversationInfo;
  handleSend: (values: InputType) => void;
  handleClick: (id: number) => number;
  onSearch: (value: string) => void;
}

const useChatData = (): useChatDataReturns => {
  const [searchParams] = useSearchParams();
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const token = access_token;
  const [search, setSearch] = useState<string>();
  const { data: conversations } = useGetConversationQuery({
    ...(search && { search }),
  });
  const { data: user } = useGetUserInfoQuery();
  const [conversation, setConversation] = useState<IConversation>(
    conversations && conversations?.length > 0 ? conversations[zero].id : zero,
  );
  const [createConversation] = useCreateConversationMutation();

  useEffect(() => {
    const userId = searchParams.get(userSearchParam);
    const jobId = searchParams.get(jobSearchParam);

    if (conversations && userId && jobId) {
      const searchedConversation = conversations.find(
        item => item.user.id === +userId && item.job.id === +jobId,
      );
      if (searchedConversation) {
        setConversation(searchedConversation.id);
      } else {
        createConversation({ job: +jobId, user: +userId });
      }
    }
  }, [conversations]);

  const skip = conversation > zero ? false : true;
  const query = {
    token,
    conversation,
  };
  const { data: chatMessages } = useGetMessagesQuery(query, { skip });
  const [sendMessage] = useSendMessageMutation();
  const [form] = Form.useForm<InputType>();
  const currentConversation = conversations?.find(
    item => item.id === conversation,
  );
  const currentConversationInfo = {
    ownerName:
      `${currentConversation?.user.first_name} ${currentConversation?.user.last_name}` ||
      '',
    jobTitle: `${currentConversation?.job.title}` || '',
    profileImg: `${currentConversation?.user.profile_image}`,
    jobDescription: currentConversation?.job.description || '',
    jobRate: currentConversation?.job.hourly_rate,
  };

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
    form.resetFields();
  };

  const onSearch = (value: string) => {
    setSearch(value.trim());
  };

  return {
    user,
    chatMessages,
    form,
    conversation,
    conversations,
    currentConversationInfo,
    handleSend,
    handleClick,
    onSearch,
  };
};

export default useChatData;
