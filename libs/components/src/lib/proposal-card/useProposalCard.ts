import { MouseEvent, useState } from 'react';

interface UseProposalCardReturn {
  coverLetterVisibility: boolean;
  coverLetterVisibilityHandler: (event: MouseEvent<HTMLElement>) => void;
}

const useProposalCard = (): UseProposalCardReturn => {
  const [coverLetterVisibility, setCoverLetterVisibility] =
    useState<boolean>(false);

  const coverLetterVisibilityHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setCoverLetterVisibility(prev => !prev);
  };

  return {
    coverLetterVisibility,
    coverLetterVisibilityHandler,
  };
};

export default useProposalCard;
