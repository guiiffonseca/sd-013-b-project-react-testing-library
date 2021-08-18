import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const testAppHelper = (history, linkName, path) => {
  const nameLink = screen.getByRole('link', { name: linkName });
  expect(nameLink).toBeInTheDocument();
  userEvent.click(nameLink);
  const { pathname } = history.location;
  expect(pathname).toBe(path);
};

describe('Test App', () => {
  test('has a home as the 1 link, about as the 2 and Favorite as the 3', () => {
    const { history } = renderWithRouter(<App />);
    testAppHelper(history, 'Home', '/');
    testAppHelper(history, 'About', '/about');
    testAppHelper(history, 'Favorite Pokémons', '/favorites');
  });
  test('test if a link is Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('Xablau');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
  });
});
