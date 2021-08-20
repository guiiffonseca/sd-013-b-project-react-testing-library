import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RouterMemory from './RouterMemory';

describe('Requisito 1', () => {
  test('O topo da aplicação possui um conjunto fixo de links de navegação.', () => {
    RouterMemory(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Deve ser possivel navegar para Home, About e Pokémons Favoritados', () => {
    const { history } = RouterMemory(<App />);

    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');

    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('A página deve ser direcionada para Not Found', () => {
    const { history } = RouterMemory(<App />);
    history.push('/rota-nao-existe');
    const notFound = screen.getByRole('heading', {
      name: /not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
