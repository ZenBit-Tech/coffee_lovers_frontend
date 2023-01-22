import { Col, Form, Typography } from 'antd';
import styled from 'styled-components';
import { InputSearch, PrimaryButton } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

const { Text } = Typography;

export const StyledWrapper = styled.div`
  height: 70vh;
  width: 100%;
  position: relative;
`;

export const TypeMessage = styled.div`
  color: blue;
  opacity: ${(props: { opacity: number }) => props.opacity};
`;

export const ContactsList = styled.ul`
  overflow: scroll;
  max-height: 70vh;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 50px;
  }
`;

export const MessagesWrapper = styled.div`
  max-height: 70vh;
  vertical-align: bottom;
  width: 100%;
  overflow: scroll;
  padding-right: 10px;

  position: absolute;
  bottom: 0;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 50px;
  }
`;

export const UserWrapper = styled.div.attrs(props => ({
  color: props.color,
}))`
  background-color: ${props => props.color};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px 2px var(--grey);
    background-color: ${baseTheme.colors.white};
  }
`;

export const InputSearchStyled = styled(InputSearch)`
  padding: 0 20px;
`;

export const StyledLeftSide = styled(Col)`
  padding-top: 20px;
  height: 85vh;
  background-color: ${baseTheme.colors.lightBlue};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 300px;
`;

export const StyledRightSide = styled(StyledLeftSide)`
  padding: 0 10px;
  background-color: var(--white-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
`;

export const StyledText = styled(Text)`
  width: 150px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: start;
  align-items: center;
  padding: 10px;
  margin-block-start: 0;
`;

export const BottomWrapper = styled(HeaderContainer)`
  width: 95%;
  position: absolute;
  bottom: 0;
`;

export const StyledFormItem = styled(Form.Item)`
  width: 85%;
`;

export const StyledButton = styled(PrimaryButton)`
  height: 45px;
  width: 100px;
`;

export const FirstUserText = styled.p`
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  min-height: 33px;
  border-radius: 10px;
  padding: 5px 10px;
  word-wrap: break-word;
`;

export const SecondUserText = styled(FirstUserText)`
  background-color: ${baseTheme.colors.lightBlue};
`;

export const FirstUserContainer = styled.div`
  display: inline-block;
  height: 100%;
  position: relative;
  text-align: left;
  align-items: left;
  max-width: 75%;
  margin: 0 0 10px 0;
`;

export const SecondUserContainer = styled(FirstUserContainer)`
  left: 100%;
  transform: translateX(-100%);
`;

export const UserDateStyled = styled.p`
  text-align: right;
`;

export const FreelancerNameStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDivStyled = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const SendOfferBtn = styled(PrimaryButton)`
  margin-left: auto;
  margin-right: 10px;
`;
