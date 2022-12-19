import { unmountComponentAtNode } from 'react-dom';
import { freelancerPageInfo, mockUserData } from '@freelance/components';
import { render, screen } from '@utils/test-utils';

import '@testing-library/jest-dom';

import FreelancerPageInfo from './index';

jest.mock('redux/services/freelancers', () => ({
  useGetFreelancerByIdQuery: () => ({ data: mockUserData, isLoading: false }),
}));

describe('FreelancerPageInfo rendering component', () => {
  const container: Element = document.createElement('div');

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
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

  it('field with freelancer name and surname displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.nameSurname).textContent).toBe(
      `${mockUserData.first_name} ${mockUserData.last_name}`,
    );
  });

  it('field with freelancer category name displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(
      screen.getByTestId(freelancerPageInfo.categoryName).textContent,
    ).toBe(`${mockUserData.category.name}`);
  });

  it('field with freelancer hourly rate displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.hr).textContent).toBe(
      `${mockUserData.hourly_rate} $`,
    );
  });

  it('field with freelancer description displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.desc).textContent).toBe(
      `${mockUserData.description}`,
    );
  });

  it('field with freelancer position displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.pos).textContent).toBe(
      `${mockUserData.position}`,
    );
  });

  it('field with freelancer available time displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.avtime).textContent).toBe(
      `${mockUserData.available_time}`,
    );
  });

  it('field with freelancer english level displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

    expect(screen.getByTestId(freelancerPageInfo.englevel).textContent).toBe(
      `${mockUserData.english_level}`,
    );
  });

  it('fields with freelancer education displays correct data taken from useGetFreelancerByIdQuery hook', () => {
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
  });

  it('fields with freelancer education are mapped correctly', () => {
    render(<FreelancerPageInfo />);

    const educations = screen.getAllByTestId(freelancerPageInfo.edu);
    expect(educations.length).toBe(2);
  });

  it('fields with freelancer workhistory displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

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
  });

  it('fields with freelancer workhistory are mapped correctly', () => {
    render(<FreelancerPageInfo />);

    const workhistory = screen.getAllByTestId(freelancerPageInfo.work);
    expect(workhistory.length).toBe(3);
  });

  it('fields with freelancer skills displays correct data taken from useGetFreelancerByIdQuery hook', () => {
    render(<FreelancerPageInfo />);

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

  it('fields with freelancer skills are mapped correctly', () => {
    render(<FreelancerPageInfo />);

    const skills = screen.getAllByTestId(freelancerPageInfo.skills);
    expect(skills.length).toBe(3);
  });
});
