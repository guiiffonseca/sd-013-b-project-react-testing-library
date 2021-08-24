import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Deve exibir \'No favorite pokemon found\' se não houverem favoritados', () => {
    render(<FavoritePokemons />);

    const message = screen.getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });

  test('Deve exibir os cards de todos os pokémons favoritados', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );

    const names = screen.getAllByTestId('pokemon-name');

    pokemons.forEach((pokemon) => {
      const cardName = names.find((name) => (
        name.textContent === pokemon.name
      ));

      expect(cardName).toBeDefined();
    });
  });
});
