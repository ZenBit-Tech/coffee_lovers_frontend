import { DraftItem, JobItem } from './types';

export const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
};

export const mockJobList: JobItem[] = [
  { title: 'Job 1', description: 'description 1', proposals: 1, hired: 0 },
  { title: 'Job 2', description: 'description 2', proposals: 1, hired: 0 },
  { title: 'Job 3', description: 'description 3', proposals: 1, hired: 0 },
  { title: 'Job 4', description: 'description 4', proposals: 1, hired: 0 },
  { title: 'Job 5', description: 'description 5', proposals: 1, hired: 0 },
];

export const mockDraftList: DraftItem[] = [
  { title: 'Draft 1' },
  { title: 'Draft 2' },
  { title: 'Draft 3' },
];
