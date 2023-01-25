import { useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import { useSearchParams } from 'react-router-dom';
import useAppSelector from '@hooks/useAppSelector';
import {
  leaveAllConversations,
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetMessagesQuery,
  useGetTypeEventQuery,
  useSendMessageMutation,
  useSendTypeEventMutation,
} from 'redux/services/chatApi';
import { useGetOffersQuery } from 'redux/services/requestApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import {
  ConversationResponse,
  ICurrentConversationInfo,
  MessageResponse,
  TypingEvents,
} from 'redux/types/chat.types';
import { Offer, OfferStatus } from 'redux/types/request.types';
import { User } from 'redux/types/user.types';

import {
  delayTimeMs,
  jobSearchParam,
  userSearchParam,
  zero,
} from './constants';

type MessageType = {
  token: string;
  conversation: number;
  message: string;
  to?: number;
  job?: number;
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
  openModal: boolean;
  openReceivedOfferModal: boolean;
  onCancel: () => void;
  showModal: () => void;
  showReceivedOfferModal: () => void;
  sendOfferButtonShow: () => boolean;
  handleSend: (values: InputType) => void;
  handleClick: (id: number) => number;
  onSearch: (value: string) => void;
  handleTyping: () => void;
  userIsTyping: boolean;
  setInputValue: (value: string) => void;
}

const useChatData = (activeChat?: number): useChatDataReturns => {
  const [searchParams] = useSearchParams();
  const { access_token }: { access_token: string } = useAppSelector(
    state => state.user,
  );
  const token = access_token;
  const [search, setSearch] = useState<string>();
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [userIsTyping, setIsTyping] = useState<boolean>(false);
  const { data: conversations } = useGetConversationQuery({
    ...(search && { search }),
  });
  const { data: user } = useGetUserInfoQuery();
  const { data: offers } = useGetOffersQuery();
  const { data: typing } = useGetTypeEventQuery(token);

  const [pendingOffer, setPendingOffer] = useState<boolean>(false);
  const [offer, setOffer] = useState<Offer>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openReceivedOfferModal, setOpenReceivedOfferModal] =
    useState<boolean>(false);
  const [conversation, setConversation] = useState<IConversation>(
    conversations && conversations?.length > 0 ? conversations[zero].id : zero,
  );
  const [conversationsRender, setConversationsRender] = useState<
    ConversationResponse[]
  >([]);
  const [createConversation] = useCreateConversationMutation();
  const [sendTyping] = useSendTypeEventMutation();

  const showModal = () => {
    setOpenModal(true);
  };
  const showReceivedOfferModal = () => {
    setOpenReceivedOfferModal(true);
  };
  const onCancel = () => {
    setOpenModal(false);
    setOpenReceivedOfferModal(false);
  };

  const sendOfferButtonShow = () => {
    const freelancerOffers = offers?.filter(
      offer => offer.freelancer.id === currentConversationInfo.freelancerId,
    );
    if (
      !freelancerOffers?.find(
        offer => offer.job.id === currentConversationInfo.jobId,
      )
    ) {
      return true;
    }

    return false;
  };

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
      job: currentConversation?.job.id,
    };
    message.token && sendMessage(message);
    form.resetFields();
  };

  const handleTyping = () => {
    if (typingStatus === false) {
      setTypingStatus(true);

      sendTyping({
        token: access_token,
        to: currentConversation?.user.id,
        type: TypingEvents.STARTTYPING,
      });
    }
  };

  useEffect(() => {
    const notification = typing?.at(zero);

    if (
      notification?.type === TypingEvents.STARTTYPING &&
      notification?.to === currentConversation?.user.id
    ) {
      setIsTyping(true);
    }
    if (
      notification?.type === TypingEvents.ENDTYPING &&
      notification?.to === currentConversation?.user.id
    ) {
      setIsTyping(false);
    }
  }, [typing, currentConversation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingStatus(false);
      sendTyping({
        token: access_token,
        to: currentConversation?.user.id,
        type: TypingEvents.ENDTYPING,
      });
    }, delayTimeMs);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const onSearch = (value: string) => {
    setSearch(value.trim());
    setConversation(zero);
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
    openModal,
    openReceivedOfferModal,
    showReceivedOfferModal,
    onCancel,
    showModal,
    sendOfferButtonShow,
    handleSend,
    handleClick,
    onSearch,
    handleTyping,
    userIsTyping,
    setInputValue,
  };
};

export default useChatData;
