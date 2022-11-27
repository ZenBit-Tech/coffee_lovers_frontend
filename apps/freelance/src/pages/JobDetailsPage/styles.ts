import { Button, Space } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 50px;
`;

export const JobOptionsText = styled.p`
  padding: 5px 10px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  margin-right: 10px;
`;

export const JobDescrText = styled.p`
  padding: 5px;
  min-height: 200px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  margin-bottom: 20px;
`;

export const JobSkillsText = styled.p`
  padding: 5px;
  width: 100px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  margin-right: 10px;
`;

export const SkillsWrapper = styled(Space)`
  margin-bottom: 20px;
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

export const LogoWrapper = styled(Space)`
  margin-left: 80px;
  align-items: center;
`;
