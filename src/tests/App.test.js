import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testing workingon of aplication "My Pokedex"', () => {
  test('The top of application have the links of navigation and have four links on page',
    () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      expect(homeLink).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', {
        name: /about/i,
      });
      expect(aboutLink).toBeInTheDocument();

      const favoritePokemonsLink = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      expect(favoritePokemonsLink).toBeInTheDocument();

      const allLinks = screen.getAllByRole('link');
      const LINKS_LENGTH = 4;
      expect(allLinks).toHaveLength(LINKS_LENGTH);
    });

  test('the application is redirect for / clicking on "Home" link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homePageTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(homePageTitle).toBeInTheDocument();
  });

  test('the application is redirect for /favorites clicking on "Favorite Pokémons"',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonsLink = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      expect(favoritePokemonsLink).toBeInTheDocument();
      userEvent.click(favoritePokemonsLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
      const favoritePokemonsTitle = screen.getByRole('heading', {
        name: /favorite pokémons/i,
        level: 2,
      });
      expect(favoritePokemonsTitle).toBeInTheDocument();
    });
  test('entering an invalid url takes the user to the Not Found page',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/invalid-url');
      const notFoundPageTitle = screen.getByRole('heading', {
        level: 2,
        name: /page requested not found/i,
      });
      expect(notFoundPageTitle).toBeInTheDocument();
      const notFoundPageImage = screen.getByAltText(/Pikachu crying/i);
      expect(notFoundPageImage).toBeInTheDocument();
    });
});
