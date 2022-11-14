import { ContainerWrapper } from './styles';

/* eslint-disable-next-line */
export interface ContainerProps {
  children?: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <ContainerWrapper>{children}</ContainerWrapper>;
}

export default Container;
