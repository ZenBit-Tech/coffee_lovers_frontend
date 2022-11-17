import { useEffect, useState } from 'react';
import { List, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AvatarUpload } from '@freelance/components';

import { mockDraftList, mockJobList, mockUser } from './constants';
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
import { DraftItem, JobItem } from './types';

const JobOwnerDashboard = () => {
  const { t } = useTranslation();
  const { first_name, last_name } = mockUser;
  const [jobList, setJobList] = useState<JobItem[]>();
  const [isShowAllJobs, setIsShowAllJobs] = useState<boolean>(false);
  const [draftList, setDraftList] = useState<DraftItem[]>();
  const [isShowAllDrafts, setIsShowAllDrafts] = useState<boolean>(false);

  useEffect(() => {
    setJobList(mockJobList.slice(0, 2));
    setDraftList(mockDraftList.slice(0, 2));
  }, []);

  const jobsListSizeHandler = (): void => {
    setJobList(isShowAllJobs ? mockJobList.slice(0, 2) : mockJobList);
    setIsShowAllJobs(prev => !prev);
  };

  const draftsListSizeHandler = (): void => {
    setDraftList(isShowAllDrafts ? mockDraftList.slice(0, 2) : mockDraftList);
    setIsShowAllDrafts(prev => !prev);
  };

  return (
    <Wrapper>
      <HeadContainer>
        <UserContainer>
          <AvatarUpload />
          <StyledName>{`${first_name} ${last_name}`}</StyledName>
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
                    amount: item.proposals,
                  })}
                </ListAction>,
                <ListAction>
                  {t('jobOwnerDashboard.jobList.hired', { amount: item.hired })}
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

      <ListContainer>
        <ListLink>{t('jobOwnerDashboard.draftsListLink')}</ListLink>
        <List
          loading={false}
          itemLayout="horizontal"
          dataSource={draftList}
          loadMore={
            <ListSize onClick={draftsListSizeHandler}>
              {t(
                isShowAllDrafts
                  ? 'jobOwnerDashboard.hide'
                  : 'jobOwnerDashboard.showAll',
              )}
            </ListSize>
          }
          renderItem={item => (
            <List.Item
              actions={[
                <ListAction>{t('jobOwnerDashboard.jobList.edit')}</ListAction>,
              ]}
            >
              <Skeleton title={false} loading={false} active>
                <List.Item.Meta title={<ListAction>{item.title}</ListAction>} />
              </Skeleton>
            </List.Item>
          )}
        />
      </ListContainer>
    </Wrapper>
  );
};

export default JobOwnerDashboard;
