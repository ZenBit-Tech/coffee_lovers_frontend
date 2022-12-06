import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { PropertiesState } from 'src/redux/types/properties.types';

const initialState: PropertiesState = {
  categories: [],
  skills: [],
  englishLevels: [],
  durationAmount: [],
  availableTime: [],
  lastUpdate: 0,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties(state, action: PayloadAction<PropertiesState>) {
      state.categories = action.payload.categories;
      state.skills = action.payload.skills;
      state.englishLevels = action.payload.englishLevels;
      state.durationAmount = action.payload.durationAmount;
      state.availableTime = action.payload.availableTime;
      state.lastUpdate = Date.now();
    },
  },
});

const propertiesPersistConfig = {
  key: 'properties',
  storage,
};

export const persistedPropertiesReducer = persistReducer(
  propertiesPersistConfig,
  propertiesSlice.reducer,
);

export const { setProperties } = propertiesSlice.actions;
