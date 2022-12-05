import { FC, useState } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/components';
import { formatDate } from 'src/utils/dates';
import { getSizedText } from 'src/utils/text';

import { cardDescriptionMaxLength } from './constants';
import {
  DescriptionVisibility,
  PropertiesContainer,
  StyledDescription,
  StyledTitle,
  Wrapper,
} from './styles';

interface JobCardProps {
  id: number;
  title: string;
  description: string;
  owner: string;
  date: Date;
  category: string;
  duration: string;
  rate: number | null;
  english: string;
  owner_rate: number | null;
  time: number | null;
}

export const JobCard: FC<JobCardProps> = props => {
  const [descriptionVisibility, setDescriptionVisibility] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.jobDetails, { state: props });
  };

  return (
    <Wrapper>
      <StyledTitle>
        <div onClick={handleClick}>{props.title}</div>
      </StyledTitle>

      <StyledDescription>
        <div>
          {descriptionVisibility
            ? props.description
            : getSizedText(props.description, cardDescriptionMaxLength)}
        </div>
      </StyledDescription>

      {props.description.length > cardDescriptionMaxLength && (
        <DescriptionVisibility
          onClick={() => setDescriptionVisibility(prev => !prev)}
        >
          {t(
            descriptionVisibility
              ? 'textVisibility.hide'
              : 'textVisibility.show',
          )}
        </DescriptionVisibility>
      )}

      <PropertiesContainer>
        <div>{props.owner}</div>
        <div>{formatDate(props.date)}</div>
        <div>{props.category}</div>
        <div>{props.duration}</div>
        <div>{t('jobCard.hrly_rate', { rate: props.rate })}</div>
      </PropertiesContainer>
    </Wrapper>
  );
};
