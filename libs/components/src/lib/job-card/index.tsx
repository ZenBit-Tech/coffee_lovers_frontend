import { FC, useState } from 'react';
import { t } from 'i18next';
import { InformationSticker } from '@freelance/components';
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
