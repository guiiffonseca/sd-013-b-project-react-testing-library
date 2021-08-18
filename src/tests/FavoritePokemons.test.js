import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemon />);
    const textNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(history.location.pathname).toBe('/pokemons/25');
    const headingNamePikachu = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(headingNamePikachu).toBeInTheDocument();
    userEvent.click(screen.getByText(/Pokémon favoritado?/i));
    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemontype = screen.getByTestId('pokemon-type');
    const pokemonweight = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemontype).toBeInTheDocument();
    expect(pokemonweight).toBeInTheDocument();
  });
});
