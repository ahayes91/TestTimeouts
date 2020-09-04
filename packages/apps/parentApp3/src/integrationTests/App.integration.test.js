import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import App from '../components/App';
import history from '../history';
import {
  handlers,
  theHoleInTheBog,
  theRattlinBog,
  handlerForBranchesUnavailableOnTheTree,
  handlerForNoBranchOnTheTree,
} from './__mocks__/mocks';

const server = setupServer(...handlers);
  beforeAll(() => {
    jest.setTimeout(30000);
    server.listen({
      onUnhandledRequest(req) {
        const errorMessage = `Found an unhandled ${req.method} request to ${req.url.href}`;
        console.error(errorMessage);
        throw errorMessage;
      },
    });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
    jest.clearAllMocks();
  });

describe('Integration test at the app level: ', () => {
  it(`displays the bog details and the branches panel with no input and an unavailable message if branches are not available`, async () => {
    server.use(...handlerForBranchesUnavailableOnTheTree);
    // Set the ID of the mocked bog and hole in the current URL for the app to retrieve for data calls
    history.push({
      pathname: `/theRattlinBog/${theRattlinBog.refId}/${theHoleInTheBog.refId}/theValleyO?`,
    });
    render(<App />);
    expect(
      await screen.findByText(/Branches are not available/, { timeout: 30000 }),
    ).toBeInTheDocument(); // This is the final query the app makes to be fully loaded, so we use await/findBy
    expect(
      screen.getByText(/The branch is no longer on your tree./),
    ).toBeInTheDocument();
    expect(screen.getByText(theRattlinBog.fullName)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Go Back/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: theHoleInTheBog.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Trees in the holes in the bog/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Branches on the trees in the holes in the bog/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Cancel/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Send/ }),
    ).not.toBeInTheDocument();
  });

  it(`displays the bog details and the branches panel with input and a no branches message if bog has no branches`, async () => {
    server.use(...handlerForNoBranchOnTheTree);
    // Set the ID of the mocked bog and hole in the current URL for the app to retrieve for data calls
    history.push({
      pathname: `/theRattlinBog/${theRattlinBog.refId}/${theHoleInTheBog.refId}/theValleyO?`,
    });
    render(<App />);
    expect(
      await screen.findByText(/No Branches Yet/, { timeout: 30000 }),
    ).toBeInTheDocument(); // This is the final query the app makes to be fully loaded, so we use await/findBy
    expect(
      screen.getByText(/To add branches to this tree, start typing below./),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Go Back/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: theHoleInTheBog.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Trees in the holes in the bog/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Branches on the trees in the holes in the bog/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(theRattlinBog.fullName)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/ })).toBeInTheDocument();
  });
});
