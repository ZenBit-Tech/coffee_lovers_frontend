import styled from 'styled-components';

interface ContainerProps {
  success?: boolean;
  danger?: boolean;
  primary?: boolean;
}

export const Container = styled.div<ContainerProps>`
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 4px 10px;
  border-radius: 10px;
  line-height: normal;
  text-align: center;

  color: ${props => (props.success ? ({ theme }) => theme.colors.success : '')};
  border-color: ${props =>
    props.success ? ({ theme }) => theme.colors.success : ''};

  color: ${props => (props.danger ? ({ theme }) => theme.colors.danger : '')};
  border-color: ${props =>
    props.danger ? ({ theme }) => theme.colors.danger : ''};

  color: ${props => (props.primary ? ({ theme }) => theme.colors.primary : '')};
  border-color: ${props =>
    props.primary ? ({ theme }) => theme.colors.primary : ''};
`;
