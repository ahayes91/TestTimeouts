import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Branch from './Branch';

expect.extend(toHaveNoViolations);

function getProps({
  name = 'I dont want to talk about things we have gone through',
} = {}) {
  return {
    branch: {
      name,
    },
  };
}

describe('Branch', () => {
  it('renders name field', () => {
    const props = getProps();
    const { getByTestId } = render(<Branch {...props} />);
    const branchText = getByTestId('branchText');
    expect(branchText).not.toBeNull();
  });

  it('has not axe violations', async () => {
    const props = getProps();
    const { container } = render(
      <ul>
        <Branch {...props} />
      </ul>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
