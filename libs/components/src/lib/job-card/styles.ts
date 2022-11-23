import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  border-radius: 5px;
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

export const DescriptionVisibility = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
  align-self: flex-end;
  cursor: pointer;
`;

export const PropertiesContainer = styled.div`
  display: flex;
  margin-top: 10px;
  border-top: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  padding: 5px 0;

  & > div {
    text-align: center;
    position: relative;
  }

  & > div::after {
    content: '';
    background: ${({ theme }) => theme.colors.lightGrey};
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 1px;
  }

  & > div:last-child::after {
    display: none;
  }

  & > div:nth-child(1) {
    width: 30%;
  }

  & > div:nth-child(2) {
    width: 15%;
  }

  & > div:nth-child(3) {
    width: 30%;
  }

  & > div:nth-child(4) {
    width: 15%;
  }

  & > div:nth-child(5) {
    width: 10%;
  }
`;
