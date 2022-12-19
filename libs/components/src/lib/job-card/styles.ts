import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.card.borderColor} solid;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};

  & > div {
    margin: 10px 20px;
  }

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  overflow: hidden;

  & > div {
    margin: 10px 20px;
  }
`;

export const PropertiesContainer = styled.div`
  display: flex;
  margin: 10px 15px;

  & > div {
    margin-right: 15px;
  }
`;
