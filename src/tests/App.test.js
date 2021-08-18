import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o arquivo App.js', () => {
  test('O primeiro link deve possuir o texto Home e ao clicar vai para sua rota', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('O segundo link deve possuir o texto About e ao clicar vai para sua rota', () => {
    const { history } = renderWithRouter(<App />);
    const AboutLink = screen.getByRole('link', { name: 'About' });
    expect(AboutLink).toBeInTheDocument();
    userEvent.click(AboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Ao clicar no Favorite Pokémons redireciona para sua rota', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokeLink).toBeInTheDocument();
    userEvent.click(favoritePokeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Testa se a aplicação é refirecionada para página not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemon-unknown');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
