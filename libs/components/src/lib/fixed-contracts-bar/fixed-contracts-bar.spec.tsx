import { render } from '@testing-library/react';

import FixedContractsBar from './fixed-contracts-bar';

describe('FixedContractsBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FixedContractsBar pages={[]} active={''} setActivePage={undefined} />,
    );
    expect(baseElement).toBeTruthy();
  });
});
