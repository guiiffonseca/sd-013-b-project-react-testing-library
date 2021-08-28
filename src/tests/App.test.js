import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a aplicação toda', () => {
  test('Se Home, About e Favorite Pokémons são renderizados', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const favPokemon = screen.getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });
  test('Se ao clicar no link Home, a página redireciona para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Se ao clicar no link About, a página redireciona para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Se a página redireciona para Favorite Pokémons com a URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Se o App é redirecionado para Not Found atráves de URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found-page');
    const notFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFound).toBeInTheDocument();
  });
});
