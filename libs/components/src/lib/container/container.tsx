import { ContainerWrapper } from './styles';

export interface ContainerProps {
  children?: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <ContainerWrapper>{children}</ContainerWrapper>;
}

export default Container;
