import { FC } from 'react';
import { t } from 'i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ExpandableText,
  InformationSticker,
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
    <Wrapper theme={baseTheme}>
      <StyledTitle theme={baseTheme}>
        <div onClick={handleClick}>{props.title}</div>
      </StyledTitle>

      {props.description && (
        <StyledDescription theme={baseTheme}>
          <ExpandableText>{props.description}</ExpandableText>
        </StyledDescription>
      )}

      <PropertiesContainer>
        <InformationSticker>{props.owner}</InformationSticker>
        <InformationSticker>{formatDate(props.date)}</InformationSticker>
        <InformationSticker>{props.category}</InformationSticker>
        <InformationSticker>{props.duration}</InformationSticker>
        <InformationSticker>
          {t('jobCard.hrly_rate', { rate: props.rate })}
        </InformationSticker>
      </PropertiesContainer>
    </Wrapper>
  );
};
