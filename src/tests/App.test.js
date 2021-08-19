import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe(`verifica que o top da aplicação contém um conjunto
fixo de links de navegaçao`, () => {
  test('Verifica se o primeiro link tem o texto Home e o clique vai para Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getAllByRole('link')[0];

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent(/Home/i);
    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica se o segundo link tem o texto About e o clique vai para About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getAllByRole('link')[1];

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveTextContent(/about/i);
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o terceiro link tem o texto Favorite e o clique vai para Favorite',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getAllByRole('link')[2];

      expect(favoriteLink).toBeInTheDocument();
      expect(favoriteLink).toHaveTextContent(/Favorite/i);
      userEvent.click(favoriteLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  test('Exibe o texto página não encontrada, quando digitar uma rota inválida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-nao-existente');

    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
