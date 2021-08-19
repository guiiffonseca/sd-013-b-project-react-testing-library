import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import App from '../App';

describe('testes do componente App', () => {
  test('testa se renderiza o link "home" e se ele funciona', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  });

  test('testa se renderiza o link "about" e se ele funciona', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/about');
  });

  test('testa se renderiza o link "Favorite Pokemons" e se ele funciona', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorites');
  });

  test('testa se quando coloca URL invalida eh redirecionado to pag Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
