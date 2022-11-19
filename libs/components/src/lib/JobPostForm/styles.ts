import styled from 'styled-components';

export const WrapperSelect = styled.div`
  width: 500px;
`;

export const FormContainer = styled.div`
  width: 500px;

  border-radius: 20px;
`;

export const FormTitle = styled.h1`
  margin: 0px 0px 60px;

  text-align: center;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.2px;
  line-height: 44px;

  color: rgb(18, 18, 20);
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  height: 75px;
  padding-left: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;

  &:hover,
  &:focus {
    border: 1px solid #000;
  }
`;

export const Input = styled.input`
  margin-left: 20px;
  height: 30px;
  outline: none;
  border: none;

  ::placeholder {
    font-size: 18px;
    line-height: 32px;
    color: #2d2d2d;
  }

  @media screen and (min-width: 768px) {
    width: 315px;
  }
`;

export const Error = styled.p`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: red;
  top: -27px;
`;

export const StyledErrorMessage = styled.span``;
