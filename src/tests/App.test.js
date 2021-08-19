import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing App.js component', () => {
  test('If the top of the application have a fixed set of navigation links', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorite = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('If the application is redirected to the home page,by clicking', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('If the application is redirected to the about page,by clicking', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('If the application is redirected to the favorite page,by clicking', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('If it is redirected to the Not Found page when entering an unknown URL.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/something');
    const notFond = screen.getByText('Page requested not found');
    expect(notFond).toBeInTheDocument();
  });
});
