import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BranchesPanel from './BranchesPanel';

jest.mock('./BranchesEmptyState', () => 'BranchesEmptyState');
jest.mock('./BranchesLoadingState', () => 'BranchesLoadingState');

expect.extend(toHaveNoViolations);

function getProps({
  name = 'I dont want to talk about things we have gone through',
} = {}) {
  const branch = {
    name,
  };
  return {
    branches: [branch, branch, branch],
  };
}

describe('BranchesPanel', () => {
  it('renders correct number of branches', () => {
    const props = getProps();
    const { getAllByTestId } = render(
      <BranchesPanel {...props} />,
    );
    const branches = getAllByTestId('branchContainer');
    expect(branches.length).toEqual(3);
  });

  it('has not axe violations', async () => {
    const props = getProps();
    const { container } = render(<BranchesPanel {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
