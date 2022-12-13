import { useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';

import InterviewModal from './interview-modal';
import { freelancerId } from './mock-data';

describe('InterviewModal', () => {
  const container: Element = document.createElement('div');

  beforeEach(() => {
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('check does modal render successfully if it is opened', () => {
    const [open, setOpen] = useState<boolean>(true);
    const { baseElement } = render(
      <InterviewModal
        open={open}
        freelancerId={freelancerId}
        setOpen={setOpen}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
