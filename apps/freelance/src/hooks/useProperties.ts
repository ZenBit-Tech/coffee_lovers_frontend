import { useDispatch } from 'react-redux';
import { categoriesRefreshTime } from '@freelance/constants';
import useAppSelector from '@hooks/useAppSelector';
import { useGetAllPropertiesQuery } from 'redux/properties/properties-api';
import { setProperties } from 'redux/properties/properties-slice';
import { Property } from 'redux/properties/types';

interface SelectOptionWithId {
  label: string;
  value: number;
}

interface SelectOptionString {
  value: string;
}

const useProperties = (): {
  categories: Property[];
  englishLevels: string[];
  skills: Property[];
  getOptionsForSelectWithId: (property: Property[]) => SelectOptionWithId[];
  getOptionsForSelectString: (property: string[]) => SelectOptionString[];
} => {
  const dispatch = useDispatch();
  const { categories, englishLevels, skills, lastUpdate } = useAppSelector(
    state => state.properties,
  );
  const skip = !(Date.now() - lastUpdate > categoriesRefreshTime);
  const { data, isSuccess } = useGetAllPropertiesQuery(undefined, { skip });

  if (isSuccess) {
    dispatch(setProperties({ ...data, lastUpdate: Date.now() }));
  }

  const getOptionsForSelectWithId = (
    property: Property[],
  ): SelectOptionWithId[] => {
    return property.map(item => ({ label: item.name, value: item.id }));
  };

  const getOptionsForSelectString = (
    property: string[],
  ): SelectOptionString[] => {
    return property.map(item => ({ value: item }));
  };

  return {
    categories,
    englishLevels,
    skills,
    getOptionsForSelectWithId,
    getOptionsForSelectString,
  };
};

export default useProperties;
