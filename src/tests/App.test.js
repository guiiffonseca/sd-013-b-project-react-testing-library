import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../Helper/RenderWithRouter';

describe('Testing App component', () => {
  test('If the app contains Home link and if upon click redirects to home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    // console.log(history);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('If the app contains about link and if upon click redirects to about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    // console.log(history);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('If the app contains favorites link and if upon click redirects to favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    // console.log(history);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('If the app redirects to page not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdasd');

    const nFound = screen.getByText(/Page requested/i);
    expect(nFound).toBeInTheDocument();
  });
});
