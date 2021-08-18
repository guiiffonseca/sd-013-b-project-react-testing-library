import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('App.js tests', () => {
  test('The header of the application contains the nav bar', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favPokemonsLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });
  test('By clicking in Home, redirect to the Home Page', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('By clicking in About, redirect to the About Page', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('By clicking in Pokemon Favorites, redirect to the Pokemon Favorites Page',
    () => {
      const { history } = renderWithRouter(<App />);

      const favPokemonsLink = screen.getByText('Favorite Pokémons');
      userEvent.click(favPokemonsLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  test('By passing an invalid route, redirect to Not Found Page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notvalidpage');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
