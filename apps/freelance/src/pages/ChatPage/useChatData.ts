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
  const { data: offers } = useGetOffersQuery();
  const [pendingOffer, setPendingOffer] = useState<boolean>(false);
  const [offer, setOffer] = useState<Offer>();
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

  console.log(offer);

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
    conversations,
    currentConversationInfo,
    pendingOffer,
    offer,
    handleSend,
    handleClick,
    onSearch,
  };
};

export default useChatData;
