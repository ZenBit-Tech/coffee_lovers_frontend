import { unmountComponentAtNode } from 'react-dom';
import {
  activeContractsMock,
  closedContractsMock,
  contractsPageTestId,
} from '@freelance/constants';
import { render, screen } from '@utils/test-utils';

import '@testing-library/jest-dom';

import ContractsList from './index';

const mockActiveData = jest.fn().mockReturnValue(activeContractsMock);
const mockClosedData = jest.fn().mockReturnValue(closedContractsMock);

jest.mock('redux/contracts/contracts', () => ({
  useGetActiveConractsQuery: () => ({
    data: mockActiveData(),
  }),
  useGetClosedContractsQuery: () => ({
    data: mockClosedData(),
  }),
}));

describe('ContractsPage page rendering', () => {
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

  it('renders a component ContractsPage', () => {
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();
  });

  it('should show contracts Tab bar and content', () => {
    const baseElement = render(<ContractsList />);

    expect(baseElement).toBeTruthy();
    expect(
      screen.getByTestId(contractsPageTestId.contractsWrapper),
    ).toBeVisible();
    expect(screen.getByTestId(contractsPageTestId.contractsTab)).toBeVisible();
  });

  it('contracts cards render successfully', () => {
    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    const jobCard = screen.getAllByTestId(contractsPageTestId.contractsCard);
    expect(jobCard).toHaveLength(activeContractsMock.length);
  });

  it('contract card should display correct data', () => {
    const index = 0;

    const baseElement = render(<ContractsList />);
    expect(baseElement).toBeTruthy();

    expect(
      screen.getAllByTestId(contractsPageTestId.freelancerNameContract)[index],
    ).toHaveTextContent(activeContractsMock[index].offer.freelancer.first_name);

    expect(
      screen.getAllByTestId(contractsPageTestId.contractsWrapper)[index],
    ).toHaveTextContent(activeContractsMock[index].offer.job.title as string);
  });
});
