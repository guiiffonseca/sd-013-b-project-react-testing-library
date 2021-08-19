import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../unit/renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    const notFavorite = screen.getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const linkPokemonDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkPokemonDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const checkFavoritePokemon = screen.getByLabelText('Pokémon favoritado?',
      { selector: 'input' });
    fireEvent.click(checkFavoritePokemon);
    const linkPokemonFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(linkPokemonFavorite);
    expect(history.location.pathname).toBe('/favorites');
    const namePokemonFavorite = screen.getByTestId('pokemon-name');
    expect(namePokemonFavorite).toHaveTextContent('Pikachu');
  });
});
