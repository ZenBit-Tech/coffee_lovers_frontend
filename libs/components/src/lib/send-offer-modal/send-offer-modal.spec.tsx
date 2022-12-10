import { render } from '@testing-library/react';

import SendOfferModal from './send-offer-modal';

describe('SendOfferModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SendOfferModal />);
    expect(baseElement).toBeTruthy();
  });
});
