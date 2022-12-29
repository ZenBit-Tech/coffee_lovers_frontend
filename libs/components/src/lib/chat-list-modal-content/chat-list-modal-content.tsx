import { useTranslation } from 'react-i18next';

import Button from '../button/button';

import { empty, many, SendInterviewPage } from './constants';
import { Conversation, Props } from './types';

export function ChatListModalContent(props: Props) {
  const { invitation, setPage } = props;
  const conversations = invitation?.data;
  const freelancer = invitation?.freelancer;
  const { t } = useTranslation();

  return (
    <div>
      {conversations?.length > empty && (
        <>
          {t('modalInvite.notification', {
            ending: conversations?.length > many && 's',
            firstName: freelancer?.first_name,
            lastName: freelancer?.last_name,
          })}
          <ul>
            {conversations?.map((item: Conversation) => (
              <a key={item.id} href="/">
                {t('modalInvite.jobTitle', { job: item.job.title })}
                <br />
              </a>
            ))}
          </ul>
          <br />
          <Button
            onClick={() => {
              setPage(SendInterviewPage);
            }}
          >
            {t('modalInvite.newChat')}
          </Button>
        </>
      )}
    </div>
  );
}

export default ChatListModalContent;
