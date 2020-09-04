import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import HeaderArea from './HeaderArea';
import { getBogName } from '../../reducers/bog.selector';
import { getHoleTitle } from '../../reducers/hole.selector';

jest.mock('react-redux');

function getProps({
  referer = 'bogDetails',
} = {}) {
  return {
    referer,
  };
}

function getWrapper(props) {
  return renderWithReactIntl(<HeaderArea {...props} />);
}

describe('Header area', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSelector.mockImplementation(selector => {
      if (selector === getBogName) {
        return {
          firstName: 'mockedFirstName',
          lastName: 'mockedLastName',
        };
      }
      if (selector === getHoleTitle) {
        return 'mockPageHeader';
      }
      return null;
    });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });
  });

  it('is rendered', () => {
    const props = getProps();
    const { container, queryByText } = getWrapper(props);
    expect(container.firstChild).not.toBeUndefined();
    const header = queryByText('mockPageHeader');
    expect(header).not.toBeNull();
  });

  it('does not render back button when referer is empty string', () => {
    const props = getProps({ referer: '' });
    getWrapper(props);
    const backButton = screen.queryByRole('link', { name: /Go Back/ });
    expect(backButton).toBeNull();
  });

  it('render skeleton', () => {
    const props = getProps();
    useSelector.mockImplementation(selector => {
      if (selector === getHoleTitle) {
        return '';
      }
      return null;
    });
    getWrapper(props);
    const skeleton = screen.queryByTestId('BogSkeleton');
    expect(skeleton).toBeTruthy();
  });

  it('calls window assign when back button is pressed', () => {
    const props = getProps();
    getWrapper(props);
    fireEvent.click(screen.getByRole('link', { name: /Go Back/ }));
    expect(window.location.assign).toHaveBeenCalled();
  });
});
