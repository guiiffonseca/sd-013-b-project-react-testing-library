import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('verifica o componente App.js', () => {
  test('verifica o link redireciona para a Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeDefined();
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('verifica se o link de navegação e com o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeDefined();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o link é de navegação e com o Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeDefined();

    userEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
