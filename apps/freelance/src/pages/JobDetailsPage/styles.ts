import { Space } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

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
  font-size: ${baseTheme.fontSize.large};
`;

export const Text = styled.p`
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

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
`;
