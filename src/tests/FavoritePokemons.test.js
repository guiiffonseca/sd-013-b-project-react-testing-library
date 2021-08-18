import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste favorite pokemons ', () => {
  it('Teste se a mensagem No Favorite Pokemon found', () => {
    render(<FavoritePokemons />);
    const textNoFavorite = screen.getByText('No favorite pokemon found');
    expect(textNoFavorite).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokemon favoritados', () => {
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
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const name = screen.getByTestId('pokemon-name');
    expect(name.textContent).toEqual('Pikachu');
    expect(name).toBeInTheDocument();

    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.textContent).toEqual('Electric');
    expect(typePoke).toBeInTheDocument();

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight.textContent).toEqual('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();
  });
});
