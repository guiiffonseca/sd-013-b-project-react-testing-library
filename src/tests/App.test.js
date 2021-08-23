import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App test', () => {
  test('O primeiro link deve possuir texto "Home" e redirecionar para "/"', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const pageHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pageHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir texto "About" e redirecionar para "/about"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const pageAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(pageAbout).toBeInTheDocument();
  });

  test('O terceiro link precisa ser "Favorite Pokemóns" e redirecionar para "/favorites"',
    () => {
      renderWithRouter(<App />);

      const linkFavorite = screen.getByRole('link', {
        name: /favorite/i,
      });
      expect(linkFavorite).toBeInTheDocument();

      userEvent.click(linkFavorite);

      const pageFavorite = screen.getByRole('heading', {
        level: 2,
        name: /favorite pokémons/i,
      });
      expect(pageFavorite).toBeInTheDocument();
    });

  test('Redirecionar para Not Found se entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(pageNotFound).toBeInTheDocument();
  });
});
