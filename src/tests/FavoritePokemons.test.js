import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3', () => {
  it('É exibida a mensagem No favorite pokemon found, se houver pokémons favoritados.',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const noFavoritePokemonsText = screen.getByText(/No favorite pokemon found/i);

      expect(noFavoritePokemonsText).toBeInTheDocument();
    });
  it('É exibido todos os cards de pokémons favoritados', () => {
    const favoritePokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const pikachuFavorited = screen.getByTestId(/pokemon-name/i);

    expect(pikachuFavorited).toBeInTheDocument();
  });
});
