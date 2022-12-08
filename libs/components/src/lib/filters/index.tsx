import { FC } from 'react';
import { Form, Select } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PrimaryButton, SecondaryButton } from '@freelance/components';
import useProperties from 'src/hooks/useProperties';

import {
  categoriesName,
  englishLevelName,
  hrlyRateEndName,
  hrlyRateStartName,
  inputNumberMin,
  inputNumberRegExp,
  skillsName,
  timeName,
} from './constants';
import {
  ButtonsContainer,
  Container,
  HorizontalContainer,
  HourlyRateContainer,
  ItemContainer,
  StyledClose,
  StyledFilterTitle,
  StyledFormItem,
  StyledInputNumber,
  StyledMinusOutlined,
  StyledTitle,
  Wrapper,
} from './styles';
import { FilterFormItems, FiltersProps } from './types';

export const Filters: FC<FiltersProps> = ({
  visibility,
  closeHandler,
  submit,
  top,
  left,
  right,
  bottom,
}) => {
  const { t } = useTranslation();
  const { handleSubmit, control, reset, getValues } =
    useForm<FilterFormItems>();
  const [form] = Form.useForm();
  const {
    categories,
    skills,
    englishLevels,
    availableTime,
    getOptionsForSelectWithId,
    getOptionsForSelectString,
  } = useProperties();

  const onSubmit: SubmitHandler<FilterFormItems> = data => {
    submit(data);
    closeHandler();
  };

  const clearHandler = () => {
    form.resetFields();
    reset();
  };

  return (
    <Wrapper
      visibility={visibility}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
    >
      <StyledClose onClick={() => closeHandler()} />
      <StyledTitle>{t('filters.title')}</StyledTitle>

      <Form onFinish={handleSubmit(onSubmit)} form={form}>
        <Container>
          <ItemContainer>
            <StyledFilterTitle>{t('filters.skills')}</StyledFilterTitle>
            <Controller
              name={skillsName}
              control={control}
              render={({ field }) => (
                <StyledFormItem {...field}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder={t('filters.skills_placeholder')}
                    options={getOptionsForSelectWithId(skills)}
                    {...field}
                  />
                </StyledFormItem>
              )}
            />
          </ItemContainer>

          <ItemContainer>
            <StyledFilterTitle>{t('filters.category')}</StyledFilterTitle>
            <Controller
              name={categoriesName}
              control={control}
              render={({ field }) => (
                <StyledFormItem {...field}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder={t('filters.category_placeholder')}
                    options={getOptionsForSelectWithId(categories)}
                    {...field}
                  />
                </StyledFormItem>
              )}
            />
          </ItemContainer>

          <ItemContainer>
            <StyledFilterTitle>{t('filters.hrly_rate')}</StyledFilterTitle>
            <HourlyRateContainer>
              <Controller
                name={hrlyRateStartName}
                control={control}
                render={({ field }) => (
                  <StyledInputNumber
                    formatter={value =>
                      `$ ${value}`.replace(inputNumberRegExp, ',')
                    }
                    min={inputNumberMin}
                    {...field}
                    max={getValues(hrlyRateEndName)}
                  />
                )}
              />
              <StyledMinusOutlined />
              <Controller
                name={hrlyRateEndName}
                control={control}
                render={({ field }) => (
                  <StyledInputNumber
                    formatter={value =>
                      `$ ${value}`.replace(inputNumberRegExp, ',')
                    }
                    min={getValues(hrlyRateStartName) || inputNumberMin}
                    {...field}
                  />
                )}
              />
            </HourlyRateContainer>
          </ItemContainer>

          <ItemContainer>
            <HorizontalContainer>
              <StyledFilterTitle>{t('filters.time')}</StyledFilterTitle>
              <Controller
                name={timeName}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue={t('filters.time_placeholder')}
                    options={getOptionsForSelectString(availableTime)}
                    allowClear
                  />
                )}
              />
            </HorizontalContainer>
          </ItemContainer>

          <ItemContainer>
            <HorizontalContainer>
              <StyledFilterTitle>
                {t('filters.english_level')}
              </StyledFilterTitle>
              <Controller
                name={englishLevelName}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue={t('filters.english_level_placeholder')}
                    options={getOptionsForSelectString(englishLevels)}
                    allowClear
                  />
                )}
              />
            </HorizontalContainer>
          </ItemContainer>

          <ButtonsContainer>
            <SecondaryButton onClick={clearHandler}>
              {t('filters.buttons.clear')}
            </SecondaryButton>
            <PrimaryButton htmlType="submit" type="primary">
              {t('filters.buttons.apply')}
            </PrimaryButton>
          </ButtonsContainer>
        </Container>
      </Form>
    </Wrapper>
  );
};

export { FilterFormItems } from './types';
