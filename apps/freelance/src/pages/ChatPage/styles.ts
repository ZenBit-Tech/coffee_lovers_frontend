import { Col, Form } from 'antd';
import styled from 'styled-components';
import { InputSearch, PrimaryButton } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

export const MessagesWrapper = styled.div`
  height: 64vh;
  overflow: auto;
  padding-right: 10px;

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
  background-color: var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 5px;
  width: 300px;
`;

export const StyledRightSide = styled(StyledLeftSide)`
  padding: 0 10px;
  height: 80vh;
  background-color: var(--white-color);
  padding-top: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  line-height: 2.7em;
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
  background-color: var(--lightGrey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 10px;
  padding: 5px 10px;
  word-wrap: break-word;
`;

export const SecondUserText = styled(FirstUserText)`
  background-color: var(--lightBlue);
`;

export const FirstUserContainer = styled.div`
  display: inline-block;
  position: relative;
  text-align: left;
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
  margin-left: 20px; ;
`;

export const SendOfferBtn = styled(PrimaryButton)`
  margin-left: auto;
  margin-right: 10px;
`;
