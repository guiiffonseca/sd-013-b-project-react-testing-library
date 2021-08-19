import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do arquivo App', () => {
  test('Testa se o topo contém um menu de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favPokemonsLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });
  test('Testa se o clique em Home leva à página', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Testa se o clique em About leva à página', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('Testa se o clique em Favoritos leva à página',
    () => {
      const { history } = renderWithRouter(<App />);

      const favPokemonsLink = screen.getByText('Favorite Pokémons');
      userEvent.click(favPokemonsLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  test('Testa se direciona para a Página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notvalidpage');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
