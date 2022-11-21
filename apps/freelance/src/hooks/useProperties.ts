import { useDispatch } from 'react-redux';
import { categoriesRefreshTime } from '@freelance/constants';
import useAppSelector from '@hooks/useAppSelector';
import { useGetAllPropertiesQuery } from 'redux/properties/properties-api';
import { setProperties } from 'redux/properties/properties-slice';

const useProperties = () => {
  const dispatch = useDispatch();
  const { categories, englishLevels, skills, lastUpdate } = useAppSelector(
    state => state.properties,
  );
  const skip = !(Date.now() - lastUpdate > categoriesRefreshTime);
  const { data, isSuccess } = useGetAllPropertiesQuery(undefined, { skip });

  if (isSuccess) {
    dispatch(setProperties({ ...data, lastUpdate: Date.now() }));
  }

  return {
    categories,
    englishLevels,
    skills,
  };
};

export default useProperties;
