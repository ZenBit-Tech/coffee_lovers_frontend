import { List, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AvatarUpload } from '@freelance/components';
import { getFileUrl } from '@utils/api';

import { mockHiredAmount } from './constants';
import {
  HeadContainer,
  ListAction,
  ListContainer,
  ListLink,
  ListSize,
  PostJobBtn,
  StyledName,
  UserContainer,
  Wrapper,
} from './styles';
import useJobOwnerDashboard from './useJobOwnerDashboard';

const JobOwnerDashboard = () => {
  const { t } = useTranslation();
  const { user, jobList, isShowAllJobs, jobsListSizeHandler, isLoading } =
    useJobOwnerDashboard();

  return (
    <Wrapper isLoading={isLoading}>
      <HeadContainer>
        <UserContainer>
          <AvatarUpload src={getFileUrl(user?.profile_image)} />
          <StyledName>{`${user?.first_name} ${user?.last_name}`}</StyledName>
        </UserContainer>
        <PostJobBtn type="primary">
          {t('jobOwnerDashboard.postJobBtn')}
        </PostJobBtn>
      </HeadContainer>

      <ListContainer>
        <ListLink>{t('jobOwnerDashboard.jobListLink')}</ListLink>
        <List
          loading={false}
          itemLayout="horizontal"
          dataSource={jobList}
          loadMore={
            <ListSize onClick={jobsListSizeHandler}>
              {t(
                isShowAllJobs
                  ? 'jobOwnerDashboard.hide'
                  : 'jobOwnerDashboard.showAll',
              )}
            </ListSize>
          }
          renderItem={item => (
            <List.Item
              actions={[
                <ListAction>{t('jobOwnerDashboard.jobList.edit')}</ListAction>,
                <ListAction>
                  {t('jobOwnerDashboard.jobList.proposal', {
                    amount: item.proposalsCount,
                  })}
                </ListAction>,
                <ListAction>
                  {t('jobOwnerDashboard.jobList.hired', {
                    amount: mockHiredAmount,
                  })}
                </ListAction>,
              ]}
            >
              <Skeleton title={false} loading={false} active>
                <List.Item.Meta
                  title={<ListAction>{item.title}</ListAction>}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </ListContainer>
    </Wrapper>
  );
};

export default JobOwnerDashboard;
