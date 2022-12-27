import { FC } from 'react';
import { t } from 'i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ExpandableText,
  InformationSticker,
  jobCardTestId,
  routes,
} from '@freelance/components';
import { baseTheme } from 'src/styles/theme';
import { formatDate } from 'src/utils/dates';

import {
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
}

export const JobCard: FC<JobCardProps> = props => {
  const navigate = useNavigate();
  const handleClick = () => {
    const id = JSON.stringify(props.id);
    const path = generatePath(routes.jobDetails, { id });
    navigate(path);
  };

  return (
    <Wrapper theme={baseTheme} data-testid={jobCardTestId.wrapper}>
      <StyledTitle theme={baseTheme} data-testid={jobCardTestId.title}>
        <div onClick={handleClick}>{props.title}</div>
      </StyledTitle>

      {props.description && (
        <StyledDescription theme={baseTheme}>
          <ExpandableText>{props.description}</ExpandableText>
        </StyledDescription>
      )}

      <PropertiesContainer>
        <InformationSticker data-testid={jobCardTestId.owner}>
          {props.owner}
        </InformationSticker>
        <InformationSticker data-testid={jobCardTestId.date}>
          {formatDate(props.date)}
        </InformationSticker>
        <InformationSticker data-testid={jobCardTestId.category}>
          {props.category}
        </InformationSticker>
        <InformationSticker data-testid={jobCardTestId.duration}>
          {props.duration}
        </InformationSticker>
        <InformationSticker data-testid={jobCardTestId.hrly_rate}>
          {t('jobCard.hrly_rate', { rate: props.rate })}
        </InformationSticker>
      </PropertiesContainer>
    </Wrapper>
  );
};
