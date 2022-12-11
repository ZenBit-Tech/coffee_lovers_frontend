import { Button } from 'antd';
import styled from 'styled-components';
import { PageWrapper } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

export const Wrapper = styled(PageWrapper)`
  padding: 1rem;
  max-width: ${baseTheme.sizes.container.width}px;
  margin: 0 auto;
`;

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

export const StyledName = styled.p`
  font-size: ${baseTheme.fontSize.medium};
  font-weight: ${baseTheme.weight.bold};
`;

export const PostJobBtn = styled(Button)`
  height: 45px;
  width: 140px;
  background-color: ${baseTheme.colors.button.green};
  border: none;

  &:hover {
    background-color: ${baseTheme.colors.button.greenHover};
  }
`;

export const ListContainer = styled.div`
  margin-top: 30px;
`;

export const ListLink = styled.a`
  text-decoration: underline;
`;

export const ListAction = styled.a``;

export const ListSize = styled.div`
  margin-top: 5px;
  color: ${baseTheme.colors.primary};

  &:hover {
    cursor: pointer;
    color: ${baseTheme.colors.secondary};
  }
`;
