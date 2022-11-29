import { TFunction } from 'i18next';
import { Rule } from 'antd/lib/form';

import { selectMaxItems } from './constants';

export const getSelectMaxItemsValidator = (t: TFunction) => ({
  validator: (_: Rule, value: number[]) => {
    if (value && value.length > selectMaxItems) {
      return Promise.reject(t('filters.errors.selectMax'));
    }

    return Promise.resolve();
  },
});
