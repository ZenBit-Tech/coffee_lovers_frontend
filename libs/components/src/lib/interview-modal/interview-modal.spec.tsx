import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';

import InterviewModal from './interview-modal';

describe('InterviewModal', () => {
  const container: Element | DocumentFragment | null =
    document.createElement('div');

  beforeEach(() => {
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('check does modal render successfully if it is opened', () => {
    const { baseElement } = render(
      <InterviewModal
        open={true}
        setOpen={function (): void {
          throw new Error('Function not implemented.');
        }}
        freelancerId={0}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
