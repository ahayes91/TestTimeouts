import singleSpaReact from 'single-spa-react';
import { bootstrap, mount, unmount } from './index';

jest.mock('single-spa-react', () => {
  return jest.fn().mockImplementation(() => ({
    bootstrap: jest.fn(),
    mount: jest.fn(),
    unmount: jest.fn(),
  }));
});

test('single-spa-react is called at loading', () => {
  bootstrap();
  mount();
  unmount();
  // this test goes outside the describe because of the beforeEach cleaning
  expect(singleSpaReact).toHaveBeenCalledTimes(1);
});
