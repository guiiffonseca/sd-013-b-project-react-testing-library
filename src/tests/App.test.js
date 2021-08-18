import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);

      const titleText = screen.getByRole('heading', {
        level: 1,
        name: /pokédex/i });
      expect(titleText).toBeInTheDocument();

      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      expect(homeLink).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', {
        name: /about/i,
      });
      expect(aboutLink).toBeInTheDocument();

      const favoriteLink = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });

      expect(favoriteLink).toBeInTheDocument();
    });
  it('Redireciona para inicial, na URL / ao clicar em link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      userEvent.click(homeLink);
      const homePath = history.location.pathname;
      expect(homePath).toBe('/');

      const encounteredPokemonsText = screen.getByText(/encountered pokémons/i);
      expect(encounteredPokemonsText).toBeInTheDocument();
    });
  it('Redireciona para About, na URL /about, ao clicar em About',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutLink);
      const aboutPath = history.location.pathname;
      expect(aboutPath).toBe('/about');

      const aboutPokedexText = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      expect(aboutPokedexText).toBeInTheDocument();
    });
  it('Redireciona para Favoritados, na URL /favorites, ao clicar em Fave Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      userEvent.click(favoriteLink);
      const favoritePath = history.location.pathname;
      expect(favoritePath).toBe('/favorites');

      const favoritePokemonsText = screen.getByRole('heading', {
        level: 2,
        name: /favorite pokémons/i,
      });
      expect(favoritePokemonsText).toBeInTheDocument();
    });
  it('Redireciona para Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/url-desconhecida');
      const notFoundText = screen.getByText(/page requested not found/i);
      expect(notFoundText).toBeInTheDocument();
    });
});
