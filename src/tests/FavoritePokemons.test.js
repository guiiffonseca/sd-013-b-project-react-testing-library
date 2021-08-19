import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoritePokemonsText = screen.getByText(/No favorite pokemon found/i);
    expect(favoritePokemonsText).toBeInTheDocument();
  });

  test('verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemon1 = 65;
    const pokemon2 = 25;
    const pokemon3 = 23;
    const pokemon4 = 10;
    const pokemon5 = 148;
    const pokemon6 = 151;

    const pokemonsID = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6];

    const favoritePokemon = pokemons.filter(({ id }) => pokemonsID.includes(id));

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const alakazam = screen.getByText('Alakazam');
    const pikachu = screen.getByText('Pikachu');
    const ekans = screen.getByText('Ekans');
    const caterpie = screen.getByText('Caterpie');
    const dragonair = screen.getByText('Dragonair');
    const mew = screen.getByText('Mew');

    expect(alakazam).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
    expect(mew).toBeInTheDocument();
  });
});
