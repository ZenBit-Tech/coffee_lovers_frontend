import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: 15px;
  margin-top: 15px;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  border: 2px solid ${({ theme }) => theme.card.borderColor};
  width: 600px;
`;
