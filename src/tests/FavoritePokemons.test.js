import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as pokedexService from '../services/pokedexService';
import App from '../App';

describe('Testando o componenete FavoritePokémon', () => {
  it('Testa se há pokémons favoritados no FavoritePokémon', () => {
    pokedexService.readFavoritePokemonIds([]);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = screen.getByText(/Favorite pokémons/i);

    fireEvent.click(favorite);

    const thereNoFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(thereNoFavorite).toBeInTheDocument();
  });
});
