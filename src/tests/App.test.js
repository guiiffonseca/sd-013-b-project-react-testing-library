import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App test', () => {
  test('primeiro link possui texto "Home" e redireciona para "/"', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const homePage = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(homePage).toBeInTheDocument();
  });

  test('segundo link possui texto "About" e redireciona para "/about"', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const aboutPage = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutPage).toBeInTheDocument();
  });

  test('terceiro link possui texto "Favorite Pokemóns" e redireciona para "/favorites"',
    () => {
      renderWithRouter(<App />);

      const favoritePokemónsLink = screen.getByRole('link', {
        name: /favorite/i,
      });
      expect(favoritePokemónsLink).toBeInTheDocument();

      userEvent.click(favoritePokemónsLink);

      const favoritePokémonsPage = screen.getByRole('heading', {
        level: 2,
        name: /favorite pokémons/i,
      });
      expect(favoritePokémonsPage).toBeInTheDocument();
    });

  test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
