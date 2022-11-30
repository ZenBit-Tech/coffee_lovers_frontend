import { Button, Space } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
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
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
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

export const StyledButton = styled(Button)`
  height: ${({ theme }) => theme.sizes.button.height};
  min-width: ${({ theme }) => theme.sizes.button.width};
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.fontSize.normal};
  outline: 0;
  border: none;
  border-radius: 8px;

  color: white;
  box-shadow: 0px 3px 5px -3px rgba(66, 75, 178, 0.36);
  background-color: ${({ theme }) => theme.colors.button.bg};

  transition: var(--animation-cubic-bezier);

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > *:first-child {
    margin-right: 20px;
  }
`;

export const LogoWrapper = styled(Space)`
  align-items: center;
  position: absolute;
  left: 20%;
  top: 30px;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
