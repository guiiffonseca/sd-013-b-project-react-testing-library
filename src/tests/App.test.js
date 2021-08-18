import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verificando os textos de cada Link', () => {
  renderWithRouter(<App />);

  test('Verificando se os Links possuem os nomes corretos', () => {
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favPokemonsLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });
});

describe('Verificando as rotas de navegação', () => {
  test('Página - HOME', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/home');
  });

  test('Página - ABOUT', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Página - Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonsLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favPokemonsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Página - Not Found, URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquerpagina');
    const notFound = screen.getByText('Page request not found');
    expect(notFound).toBeInTheDocument();
  });
});
