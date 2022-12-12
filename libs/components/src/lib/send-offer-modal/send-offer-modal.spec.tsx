import { render } from '@testing-library/react';

import SendOfferModal from './send-offer-modal';

describe('SendOfferModal', () => {
  test('should render successfully when it is opened', () => {
    const { baseElement } = render(
      <SendOfferModal
        open={true}
        setOpen={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
