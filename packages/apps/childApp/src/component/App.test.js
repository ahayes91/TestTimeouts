import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// avoid calling hook that makes api call
jest.mock('./Branches.hook');

describe('Branches App ', () => {
  it('renders app', () => {
    const mockProps = {
      holeRefId: 'mockHoleRefId',
      bogRefId: 'mockBogRefId',
    };
    const { container } = render(<App {...mockProps} />);
    expect(container).not.toBeEmpty();
  });
});
