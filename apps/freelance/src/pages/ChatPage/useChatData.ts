import { useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import { useSearchParams } from 'react-router-dom';
import useAppSelector from '@hooks/useAppSelector';
import {
  leaveAllConversations,
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from 'redux/services/chatApi';
import { useGetOffersQuery } from 'redux/services/requestApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import {
  ConversationResponse,
  ICurrentConversationInfo,
  MessageResponse,
} from 'redux/types/chat.types';
import { Offer, OfferStatus } from 'redux/types/request.types';
import { User } from 'redux/types/user.types';

import { jobSearchParam, userSearchParam, zero } from './constants';

type MessageType = {
  token: string;
  conversation: number;
  message: string;
  to?: number;
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
  pendingOffer: boolean;
  offer?: Offer;
  offers?: Offer[];
  handleSend: (values: InputType) => void;
  handleClick: (id: number) => number;
  onSearch: (value: string) => void;
}

const useChatData = (activeChat?: number): useChatDataReturns => {
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
  const { data: offers } = useGetOffersQuery();
  const [pendingOffer, setPendingOffer] = useState<boolean>(false);
  const [offer, setOffer] = useState<Offer>();
  const [conversation, setConversation] = useState<IConversation>(
    conversations && conversations?.length > 0 ? conversations[zero].id : zero,
  );
  const [conversationsRender, setConversationsRender] = useState<
    ConversationResponse[]
  >([]);
  const [createConversation] = useCreateConversationMutation();

  useEffect(() => {
    return () => {
      leaveAllConversations();
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      setConversation(activeChat);
    }
  }, [activeChat]);

  useEffect(() => {
    setConversationsRender(conversations || []);

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

  useEffect(() => {
    const conversationsData = [...conversationsRender];
    const index = conversationsData.findIndex(item => item.id === conversation);
    if (index >= zero) {
      conversationsData[index] = {
        ...conversationsData[index],
        new_messages: zero,
      };
    }
    setConversationsRender(conversationsData);
  }, [conversation]);

  const skip = conversation <= zero;
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
    jobId: currentConversation?.job.id,
    freelancerId: currentConversation?.user.id,
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
      to: currentConversation?.user.id,
    };
    message.token && sendMessage(message);
    form.resetFields();
  };

  const onSearch = (value: string) => {
    setSearch(value.trim());
  };

  useEffect(() => {
    const el = document.getElementById('messages');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    const currentOffer = offers
      ?.filter(item => item.status === OfferStatus.PENDING)
      .find(item => item.job.id === currentConversationInfo.jobId);
    setOffer(currentOffer);
    currentOffer ? setPendingOffer(true) : setPendingOffer(false);
  }, [conversation, currentConversationInfo.jobId, offers, user?.role]);

  return {
    user,
    chatMessages,
    form,
    conversation,
    conversations: conversationsRender,
    currentConversationInfo,
    pendingOffer,
    offer,
    offers,
    handleSend,
    handleClick,
    onSearch,
  };
};

export default useChatData;
