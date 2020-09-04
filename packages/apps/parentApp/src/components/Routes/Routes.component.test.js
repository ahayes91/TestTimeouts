import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Routes from './Routes.component';

jest.mock(
  '../TheRattlinBog/TheRattlinBog.component',
  () => () => 'mockedTheRattlinBog',
);
jest.mock('react-redux');

function getProps({ sif = 'mockSif' } = {}) {
  return {
    sif,
  };
}

describe('Routes ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const dispatchSpy = jest.fn();
    useDispatch.mockImplementation(() => dispatchSpy);
  });

  it('renders as expected', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Routes {...getProps()} />
      </MemoryRouter>,
    );
    expect(asFragment()).not.toBeNull();
  });

  it('when route is theRattlinBog renders TheRattlinBog when app has bootstrapped', () => {
    const { queryByText } = render(
      <MemoryRouter
        initialEntries={['/theRattlinBog/1234/1234/1234']}
      >
        <Routes />
      </MemoryRouter>,
    );
    const rattlinBog = queryByText('mockedTheRattlinBog');
    expect(rattlinBog).not.toBeUndefined();
  });
});
