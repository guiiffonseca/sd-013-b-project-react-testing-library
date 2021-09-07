import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do arquivo App', () => {
  test('Testa se contém um menu de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  test('Testa o link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Testa o link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('Testa o link Favoritos',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getByText('Favorite Pokémons');
      userEvent.click(favoriteLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  test('Testa a Página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notvalidpage');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
