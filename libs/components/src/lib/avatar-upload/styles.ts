import { Upload } from 'antd';
import styled from 'styled-components';

export const StyledUpload = styled(Upload)`
  cursor: pointer;
  text-align: center;
`;

export const StyledUploadLine = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledImg = styled.img`
  width: 100%;
`;
