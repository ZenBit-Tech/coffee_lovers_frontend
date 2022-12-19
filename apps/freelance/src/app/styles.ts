import styled from 'styled-components';

export const Wrapper = styled.div``;

interface RoutesWrapperProps {
  isAppBar?: boolean;
}

export const RoutesWrapper = styled.div<RoutesWrapperProps>`
  margin-top: ${props => (props.isAppBar ? '80px' : '0')};
`;
