import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

const COLOR = {
  primary: css`
    color: #fff;
    background: linear-gradient(#4f3cde, #e943d5);
  `,
  secondary: css`
    color: #000;
    background: linear-gradient(#c7c7d2, #bcbaba);
  `,
};
const DISABLED = css`
  cursor: not-allowed;
  background: #d4d4d4;
  color: #f5f5f5;
`;

export const Container = styled.button<ButtonProps>`
  padding: 20px 10px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;

  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}
`;
