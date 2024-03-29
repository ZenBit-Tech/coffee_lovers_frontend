import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, routes } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

import { empty, many, SendInterviewPage } from './constants';
import { DecoratedLink } from './styles';
import { Conversation, Props } from './types';

export function ChatListModalContent(props: Props) {
  const { invitation, setPage } = props;
  const conversations = invitation?.data;
  const freelancer = invitation?.freelancer;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      {conversations?.length > empty ? (
        <>
          {t('modalInvite.notification', {
            ending: conversations?.length > many && 's',
            firstName: freelancer?.first_name,
            lastName: freelancer?.last_name,
          })}
          <ul>
            {conversations?.map((item: Conversation) => (
              <DecoratedLink
                theme={baseTheme}
                key={item.id}
                onClick={() => {
                  navigate(routes.chat, { state: item.id });
                }}
              >
                {' '}
                {t('modalInvite.jobTitle', { job: item.job.title })}
                <br />
              </DecoratedLink>
            ))}
          </ul>
          <br />
        </>
      ) : (
        <Empty />
      )}

      <Button
        onClick={() => {
          setPage(SendInterviewPage);
        }}
      >
        {t('modalInvite.newChat')}
      </Button>
    </div>
  );
}

export default ChatListModalContent;
