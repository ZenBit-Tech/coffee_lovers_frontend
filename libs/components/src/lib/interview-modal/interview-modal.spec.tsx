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
  it('should render successfully', () => {
    const { baseElement } = render(
      <InterviewModal
        open={true}
        setOpen={function (op: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
