/* import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';
import Data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
    );

    const component = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(component).toBeInTheDocument();
  });

  // it('', () => {

  // });
}); */
