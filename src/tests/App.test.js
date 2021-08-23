import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('App.js tests', () => {
  test('If header contains fixed links', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favPokemon = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });
  test('Go to Home page by clicking in Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Go to About page by clicking in About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Go to Favorites Pokemons by clicking in Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      const favPokemons = screen.getByText('Favorite Pokémons');
      userEvent.click(favPokemons);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('Go to Not Found if has an invalid route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notvalidpage');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
