import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

const { Text } = Typography;

export const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
`;

export const JobDetailsWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const JobOptionsText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 5px;
  margin-right: 10px;
  align-items: center;
`;

export const LabelText = styled.p`
  font-size: ${baseTheme.fontSize.medium};
`;

export const StyledText = styled.p`
  font-size: ${baseTheme.fontSize.medium};
`;

export const JobDescrText = styled.div`
  max-width: 900px;
  padding: 15px;
  min-height: 100px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const JobSkillsText = styled.p`
  padding: 5px 10px;
  min-width: 70px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 5px;
  margin-right: 10px;
  text-align: center;
`;

export const SkillsWrapper = styled(Space)`
  margin-bottom: 20px;
`;

export const RightColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; ;
`;

export const ErrorText = styled(Text)`
  margin-left: 20px;
`;

export const StyledRatingWrapper = styled.div`
  width: 300px;
`;

export const StyledRatingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

export const StyledReviewsWrapper = styled.div`
  margin-top: 40px;
`;

export const StyledDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledReviewsBox = styled.div`
  margin-top: 100px;
`;

export const FreelancerNameDiv = styled.div`
  font-weight: ${({ theme }) => theme.weight?.bold};
`;

export const StRatingCommentBox = styled.div`
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  padding: 5px 10px;
  min-height: 100px;
`;
