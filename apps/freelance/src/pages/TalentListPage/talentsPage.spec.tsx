import { unmountComponentAtNode } from 'react-dom';
import {
  filtersTestId,
  mockUseProperties,
  mockUserData,
  talentsPageTestId,
} from '@freelance/constants';
import { fireEvent, render, screen } from '@utils/test-utils';

import '@testing-library/jest-dom';

import ContractsList from './index';
import TalentListPage from './index';
import { TestContractsRes, TestFavoritiesRes, TestTalentsRes } from './model';

jest.mock('redux/services/contractApi', () => ({
  useGetAllContractsQuery: (): TestContractsRes => ({
    data: [mockUserData],
  }),
}));

jest.mock('redux/services/userApi', () => ({
  useGetFavoritesQuery: (): TestFavoritiesRes => ({
    data: [{ id: 1, freelancer: { id: 5, user: mockUserData } }],
  }),
  useGetFreelancerQuery: (): TestTalentsRes => ({
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

  it('filter should be visible after user click the button', () => {
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    const filterButton = screen.getByTestId(
      talentsPageTestId.talentsFilterButton,
    );
    expect(filterButton).toBeVisible();
    fireEvent.click(filterButton);
    expect(screen.getByTestId(filtersTestId.wrapper)).toBeVisible();
  });
});
