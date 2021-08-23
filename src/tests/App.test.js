import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente App', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getAllByRole('link', { name: 'Home' })[0];
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(home).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(about).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(favPokemons).toBeInTheDocument();
  });
});
