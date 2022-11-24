import { FC, useState } from 'react';
import { t } from 'i18next';
import { formatDate } from 'src/utils/dates';

import { cardDescriptionMaxLength } from './constants';
import {
  DescriptionVisibility,
  PropertiesContainer,
  StyledDescription,
  StyledTitle,
  Wrapper,
} from './styles';
import { getSizedDescription } from './utils';

interface JobCardProps {
  title: string;
  description: string;
  owner: string;
  date: Date;
  category: string;
  duration: string;
  rate: number | null;
}

export const JobCard: FC<JobCardProps> = props => {
  const [descriptionVisibility, setDescriptionVisibility] =
    useState<boolean>(false);

  return (
    <Wrapper>
      <StyledTitle>
        <div>{props.title}</div>
      </StyledTitle>

      <StyledDescription>
        <div>
          {descriptionVisibility
            ? props.description
            : getSizedDescription(props.description)}
        </div>
      </StyledDescription>

      {props.description.length > cardDescriptionMaxLength && (
        <DescriptionVisibility
          onClick={() => setDescriptionVisibility(prev => !prev)}
        >
          {t(descriptionVisibility ? 'jobCard.desc_hide' : 'jobCard.desc_show')}
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
