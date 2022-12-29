import { unmountComponentAtNode } from 'react-dom';
import {
  freelancerProfile,
  mockFreelacerEducation,
  mockFreelancerProfileData,
  mockFreelancerWH,
} from '@freelance/components';
import { render, screen } from '@utils/test-utils';
import {
  AddEducation,
  AddWorkhistory,
  UpdateUser,
} from 'redux/types/user.types';

import '@testing-library/jest-dom';

import FreelancerProfile from './index';

const UpdateUserInfo = (userPayload: UpdateUser) => userPayload;
const AddUserEduInfo = (educationPayloadArr: AddEducation[]) =>
  educationPayloadArr;
const AddUserWorkhistory = (workPayloadArr: AddWorkhistory[]) => workPayloadArr;

jest.mock('redux/services/user', () => ({
  useGetUserInfoQuery: () => ({
    data: mockFreelancerProfileData,
    isLoading: false,
  }),
  useGetUserWorkInfoQuery: () => ({ data: mockFreelancerWH, isLoading: false }),
  useGetUserEducationInfoQuery: () => ({
    data: mockFreelacerEducation,
    isLoading: false,
  }),
  useUpdateUserInfoMutation: () => [UpdateUserInfo],
  useAddUserEduInfoMutation: () => [AddUserEduInfo],
  useAddUserWorkhistoryInfoMutation: () => [AddUserWorkhistory],
}));

describe('FreelancerPageInfo rendering component using data from rtk query', () => {
  const container: Element = document.createElement('div');

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('renders a component FreelancerProfile', () => {
    const baseElement = render(<FreelancerProfile />);

    expect(baseElement).toBeTruthy();
  });

  it('field with freelancer data displays correct data from rtk query', () => {
    render(<FreelancerProfile />);

    expect(screen.getByTestId(freelancerProfile.profileImage).textContent).toBe(
      `${mockFreelancerProfileData.first_name} ${mockFreelancerProfileData.last_name}`,
    );

    expect(screen.getByTestId(freelancerProfile.email).textContent).toBe(
      `${mockFreelancerProfileData?.email}`,
    );
  });
});
