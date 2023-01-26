import { unmountComponentAtNode } from 'react-dom';
import {
  freelancerForm,
  freelancerProfile,
  mockFreelacerEducation,
  mockFreelancerProfileData,
  mockFreelancerWH,
} from '@freelance/components';
import { fireEvent, render, screen } from '@utils/test-utils';
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

jest.mock('redux/services/userApi', () => ({
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
  useSetProfileImageMutation: () => [() => ({}), { data: {} }],
}));

describe('FreelancerProfile renders all fields and displays correct data after user sets it', () => {
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

  it('freelancer form fields displays correct data after user sets values', () => {
    render(<FreelancerProfile />);

    const descriptionField = screen.getByTestId(freelancerForm.descr);
    const hrField = screen.getByTestId(freelancerForm.hr);
    const posField = screen.getByTestId(freelancerForm.pos);
    const otherExpField = screen.getByTestId(freelancerForm.other_experience);

    expect(descriptionField).toBeInTheDocument();
    expect(hrField).toBeInTheDocument();
    expect(posField).toBeInTheDocument();
    expect(otherExpField).toBeInTheDocument();

    expect(descriptionField).toContainHTML('');
    fireEvent.input(descriptionField, {
      target: { value: mockFreelancerProfileData.description },
    });
    expect(descriptionField).toContainHTML(
      mockFreelancerProfileData.description,
    );
    expect(descriptionField).not.toBe('');

    expect(hrField).toContainHTML('');
    fireEvent.input(hrField, {
      target: { value: mockFreelancerProfileData.hourly_rate },
    });
    expect(hrField).toContainHTML(
      String(mockFreelancerProfileData.hourly_rate),
    );
    expect(hrField).not.toBe('');

    expect(posField).toContainHTML('');
    fireEvent.input(posField, {
      target: { value: mockFreelancerProfileData.position },
    });
    expect(posField).toContainHTML(mockFreelancerProfileData.position);
    expect(posField).not.toBe('');

    expect(otherExpField).toContainHTML('');
    fireEvent.input(otherExpField, {
      target: { value: mockFreelancerProfileData.other_experience },
    });
    expect(otherExpField).toContainHTML(
      mockFreelancerProfileData.other_experience,
    );
    expect(otherExpField).not.toBe('');
  });

  it('freelancer form select fields displays in the document', async () => {
    render(<FreelancerProfile />);

    const avTimeSelect = screen.getByTestId(freelancerForm.avtime);
    const skillsSelect = screen.getByTestId(freelancerForm.skills);
    const categorySelect = screen.getByTestId(freelancerForm.categoryName);
    const engLevelSelectField = screen.getByTestId(freelancerForm.englevel);

    expect(avTimeSelect).toBeVisible();
    expect(skillsSelect).toBeVisible();
    expect(categorySelect).toBeVisible();
    expect(engLevelSelectField).toBeVisible();
  });

  it('should not submit with empty fields', async () => {
    render(<FreelancerProfile />);
    const submit = jest.fn();

    fireEvent.click(screen.getByTestId(freelancerForm.submit_btn));
    expect(submit).not.toHaveBeenCalled();
  });
});
