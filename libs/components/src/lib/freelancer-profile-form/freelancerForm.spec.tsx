// // import { t } from 'i18next';
// import { unmountComponentAtNode } from 'react-dom';
// import {
//   freelancerProfile,
//   mockFreelacerEducation,
//   mockFreelancerProfileData,
//   mockFreelancerWH,
// } from '@freelance/components';
// // import { render, screen } from '@testing-library/react';
// import {
//   AddEducation,
//   AddWorkhistory,
//   UpdateUser,
// } from 'src/redux/types/user.types';
// import { render, screen } from 'src/utils/test-utils';

// import '@testing-library/jest-dom';

// import { FreelancerForm } from './index';

// const UpdateUserInfo = (userPayload: UpdateUser) => userPayload;
// const AddUserEduInfo = (educationPayloadArr: AddEducation[]) =>
//   educationPayloadArr;
// const AddUserWorkhistory = (workPayloadArr: AddWorkhistory[]) => workPayloadArr;

// jest.mock('src/redux/services/userApi', () => ({
//   useGetUserInfoQuery: () => ({
//     data: mockFreelancerProfileData,
//     isLoading: false,
//   }),
//   useGetUserWorkInfoQuery: () => ({ data: mockFreelancerWH, isLoading: false }),
//   useGetUserEducationInfoQuery: () => ({
//     data: mockFreelacerEducation,
//     isLoading: false,
//   }),
//   useUpdateUserInfoMutation: () => [UpdateUserInfo],
//   useAddUserEduInfoMutation: () => [AddUserEduInfo],
//   useAddUserWorkhistoryInfoMutation: () => [AddUserWorkhistory],
// }));

// jest.mock('src/redux/services/contractApi', () => ({
//   useCloseContractMutation: () => [() => ({})],
// }));

// describe('FreelancerForm rendering component using data from rtk query', () => {
//   const container: Element = document.createElement('div');

//   beforeAll(() => {
//     Object.defineProperty(window, 'matchMedia', {
//       writable: true,
//       value: jest.fn().mockImplementation(query => ({
//         matches: false,
//         media: query,
//         onchange: null,
//         addListener: jest.fn(),
//         removeListener: jest.fn(),
//         addEventListener: jest.fn(),
//         removeEventListener: jest.fn(),
//         dispatchEvent: jest.fn(),
//       })),
//     });
//   });

//   beforeEach(() => {
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//   });

//   it('renders a component FreelancerForm', () => {
//     // const baseElement = render(<FreelancerForm submitText={t('description.freelancerEditProfile.save')}/>);
//     const baseElement = render(<FreelancerForm submitText={'submit'}/>);

//     expect(baseElement).toBeTruthy();
//   });

//   // it('field with freelancer data displays correct data from rtk query', () => {
//   //   render(<FreelancerForm submitText={t('description.freelancerEditProfile.save')}/>);

//   //   expect(screen.getByTestId(freelancerProfile.profileImage).textContent).toBe(
//   //     `${mockFreelancerProfileData.first_name} ${mockFreelancerProfileData.last_name}`,
//   //   );

//   //   expect(screen.getByTestId(freelancerProfile.email).textContent).toBe(
//   //     `${mockFreelancerProfileData?.email}`,
//   //   );
//   // });
// });
