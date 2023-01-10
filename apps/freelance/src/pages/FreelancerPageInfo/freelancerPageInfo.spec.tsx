import { unmountComponentAtNode } from 'react-dom';
import { freelancerPageInfo, mockUserData } from '@freelance/components';
import { render, screen } from '@utils/test-utils';

import '@testing-library/jest-dom';

import FreelancerPageInfo from './index';

jest.mock('redux/services/userApi', () => ({
  useGetFreelancerByIdQuery: () => ({ data: mockUserData, isLoading: false }),
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

  it('renders a component FreelancerPageInfo', () => {
    const baseElement = render(<FreelancerPageInfo />);

    expect(baseElement).toBeTruthy();
  });

  it('field with freelancer data displays correct data from rtk query', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.nameSurname).textContent).toBe(
      `${mockUserData.first_name} ${mockUserData.last_name}`,
    );

    expect(
      screen.getByTestId(freelancerPageInfo.categoryName).textContent,
    ).toBe(`${mockUserData.category.name}`);

    expect(screen.getByTestId(freelancerPageInfo.hr).textContent).toBe(
      `${mockUserData.hourly_rate} $`,
    );

    expect(screen.getByTestId(freelancerPageInfo.desc).textContent).toBe(
      `${mockUserData.description}`,
    );

    expect(screen.getByTestId(freelancerPageInfo.pos).textContent).toBe(
      `${mockUserData.position}`,
    );

    expect(screen.getByTestId(freelancerPageInfo.avtime).textContent).toBe(
      `${mockUserData.available_time}`,
    );

    expect(screen.getByTestId(freelancerPageInfo.englevel).textContent).toBe(
      `${mockUserData.english_level}`,
    );
  });

  it('fields with mapped array of objects displays correct data', () => {
    render(<FreelancerPageInfo />);

    expect(mockUserData.educations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ education_from: '2010' }),
      ]),
    );

    expect(mockUserData.educations).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 2 })]),
    );

    expect(mockUserData.educations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ education_descr: 'Harward IU' }),
      ]),
    );

    expect(mockUserData.workHistory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ work_history_from: '2016' }),
      ]),
    );

    expect(mockUserData.workHistory).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 3 })]),
    );

    expect(mockUserData.workHistory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ work_history_descr: 'Boudin Bakery' }),
      ]),
    );

    expect(mockUserData.skills).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'HTML' })]),
    );

    expect(mockUserData.skills).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 2 })]),
    );

    expect(mockUserData.skills).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'not real id' })]),
    );
  });

  it('fields with freelancer education, work and skills are mapped correctly', () => {
    render(<FreelancerPageInfo />);

    const educations = screen.getAllByTestId(freelancerPageInfo.edu);
    expect(educations.length).toBe(2);

    const workhistory = screen.getAllByTestId(freelancerPageInfo.work);
    expect(workhistory.length).toBe(3);

    const skills = screen.getAllByTestId(freelancerPageInfo.skills);
    expect(skills.length).toBe(3);
  });
});
