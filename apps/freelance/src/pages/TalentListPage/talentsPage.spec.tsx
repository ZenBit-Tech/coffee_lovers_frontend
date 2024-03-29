import { unmountComponentAtNode } from 'react-dom';
import {
  filtersTestId,
  mockUseProperties,
  mockUserData,
  talentsPageTestId,
} from '@freelance/constants';
import { render, screen } from '@utils/test-utils';

import '@testing-library/jest-dom';

import ContractsList from './index';
import TalentListPage from './index';

jest.mock('redux/services/contractApi', () => ({
  useGetAllContractsQuery: () => ({
    data: [mockUserData],
  }),
}));

jest.mock('redux/services/userApi', () => ({
  useGetFavoritesQuery: () => ({
    data: [{ id: 1, freelancer: { id: 5, user: mockUserData } }],
  }),
  useGetFreelancerQuery: () => ({
    data: [[mockUserData], 1],
  }),
  useSetFavoritesMutation: () => [() => null],
}));

jest.mock('src/hooks/useProperties', () => {
  return () => mockUseProperties;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TalentsPage rendering', () => {
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

  it('renders a component TalentsPage', () => {
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();
  });

  it('should show talents Tab bar, content and pagination', () => {
    const baseElement = render(<TalentListPage />);

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId(talentsPageTestId.talentsBar)).toBeVisible();
    expect(screen.getByTestId(talentsPageTestId.listOfTalents)).toBeVisible();
    expect(
      screen.getByTestId(talentsPageTestId.talentsPagination),
    ).toBeVisible();
  });

  it('talents cards render successfully', () => {
    const lengthOfMockTalentsData = 1;
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    const talentCard = screen.getAllByTestId(talentsPageTestId.talentsCard);
    expect(talentCard).toHaveLength(lengthOfMockTalentsData);
  });

  it('talent card should display freelancer data', () => {
    const lengthOfMockTalentsData = 1;

    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    expect(screen.getAllByTestId(talentsPageTestId.talentRate)).toHaveLength(
      lengthOfMockTalentsData,
    );

    expect(screen.getAllByTestId(talentsPageTestId.talentName)).toHaveLength(
      lengthOfMockTalentsData,
    );
  });

  it('filter should be hidden firstly', () => {
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByTestId(filtersTestId.wrapper)).not.toBeVisible();
  });
});
