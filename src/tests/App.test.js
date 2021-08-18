import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';

describe('App.js Tests', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });

  test('O primeiro link deve possuir o texto Home.', () => {
    const homeLink = screen.getAllByRole('link')[0];
    expect(homeLink.innerHTML).toBe('Home');
  });

  test('O segundo link deve possuir o texto About.', () => {
    const aboutLink = screen.getAllByRole('link')[1];
    expect(aboutLink.innerHTML).toBe('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const favoritePokemonsLink = screen.getAllByRole('link')[2];
    expect(favoritePokemonsLink.innerHTML).toBe('Favorite Pokémons');
  });

  test('clicar no link Home redireciona para /', () => {
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);

    const homeTextHeading = screen.getByRole('heading', { level: 2 });

    expect(homeTextHeading).toBeInTheDocument();
    expect(homeTextHeading.innerHTML).toBe('Encountered pokémons');
  });

  test('clicar no link About redireciona para /about...', () => {
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);

    const aboutTextHeading = screen.getByRole('heading', { level: 2 });

    expect(aboutTextHeading).toBeInTheDocument();
    expect(aboutTextHeading.innerHTML).toBe('About Pokédex');
  });

  test('clicar no link Favorite Pokémons redireciona para /favorites', () => {
    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokemonsLink);

    const favoritePokemonsTextHeading = screen.getByRole('heading', {
      level: 2,
    });

    expect(favoritePokemonsTextHeading).toBeInTheDocument();
    expect(favoritePokemonsTextHeading.innerHTML).toMatch(/Favorite pokémons/);
  });

  test(`a aplicação é redirecionada para a${
    ''
  } página Not Found ao entrar em uma URL desconhecida.`, () => {
    history.push('/invalid-route');

    const notFoundTextHeading = screen.getByRole('heading', { level: 2 });

    expect(notFoundTextHeading).toBeInTheDocument();
    expect(notFoundTextHeading.innerHTML).toMatch(/Page requested not found/i);
  });
});
