import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Teste da componente Favorite Pokémon', () => {
  it('Mensagem No "favorite pokemon found" quando o usuária não tem favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const noMessage = screen.getByText('No favorite pokemon found');
    expect(noMessage).toBeInTheDocument();
  });

  it('Todos os cards de pokemons favoritos são exibidos', () => {
    const pokemons = [
      {
        id: 24,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 23,
        name: 'Ekans',
        type: 'Poison',
        averageWeight: {
          value: '6.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const names = screen.getAllByTestId('pokemon-name');
    expect(names).toHaveLength(2);
  });
});
