import { Row, Space } from 'antd';
import styled from 'styled-components';
import { PageWrapper } from '@freelance/components';

export const Wrapper = styled(PageWrapper)`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const FreelancerInfo = styled.div`
  padding-top: 50px;
  .ant-col-18 {
    flex: initial;
  }
  > * {
    margin-bottom: 20px;
  }
`;

export const StCol = styled.div`
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
`;

export const Label = styled.p`
  font-weight: ${({ theme }) => theme.weight?.bold};
  font-size: ${({ theme }) => theme.fontSize?.large};
`;

export const ReviewLabel = styled.p`
  margin-top: 50px;
  font-weight: ${({ theme }) => theme.weight?.bold};
  font-size: ${({ theme }) => theme.fontSize?.extraLarge};
`;

export const Hr = styled.p`
  min-width: 50px;
`;

export const BigBox = styled.p`
  width: 700px;
  min-height: 150px;
`;

export const MediuBox = styled.p`
  min-width: 250px;
`;

export const FreelancerData = styled.p`
  max-width: 250px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const EduData = styled.p`
  width: 272px;
  min-height: 40.65px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
`;

export const EduTime = styled.p`
  min-width: 100px;
  height: 40.65px;
  margin-left: 100px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
`;

export const WorkData = styled.p`
  width: 350px;
  min-height: 100px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
`;

export const WorkTime = styled.p`
  min-width: 100px;
  height: 40.65px;
  margin-left: 20px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
`;

export const Skill = styled.p`
  min-width: 100px;
  height: 40.65px;
  margin-right: 20px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
  &:last-child {
    margin-right: 0;
  }
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 250px;
  display: flex;
  justify-content: flex-end;
  & > *:first-child {
    margin-right: 20px;
  }
`;

export const LogoWrapper = styled(Space)`
  align-items: center;
  margin-top: 5px;
  font-weight: ${({ theme }) => theme.weight?.bold};
  font-size: ${({ theme }) => theme.fontSize?.large};
`;

export const RatingCol = styled(Row)`
  margin-bottom: 50px;
`;

export const JobOwnerNameRateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const JobOwnerNameDiv = styled.div`
  font-weight: ${({ theme }) => theme.weight?.bold};
  font-size: ${({ theme }) => theme.fontSize?.large};
`;

export const JobOwnerJobDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSize?.large};
`;
export const StRatingCommentBox = styled.div`
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
  min-height: 100px;
`;
