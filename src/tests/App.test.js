import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from './../App';
import renderWithRouter from './utils/renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About, Favorite Pokémons ', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home', });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritesPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritesPokemons).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i, });
    userEvent.click(linkHome);

    const titleEncounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(titleEncounteredPokemons).toBeInTheDocument();

  });

  test.skip('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {});

  test.skip('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {});

  test.skip('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {});
});
