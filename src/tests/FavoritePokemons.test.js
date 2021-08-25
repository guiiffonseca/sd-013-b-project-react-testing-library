import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o arquivo FavoritePokemons.js', () => {
  it('Testa a exibição da mensagem "No favorite pokemon found" se não há pokémons fav..',
    () => {
      renderWithRouter(<FavoritePokemons />);
      expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);

    const checkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFavorite).toBeInTheDocument();
    fireEvent.click(checkFavorite);

    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritePokemons);
    expect(favoritePokemons).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
