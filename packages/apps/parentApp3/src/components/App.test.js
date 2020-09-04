import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App ', () => {
  it('renders as expected', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).not.toBeNull();
  });
});
