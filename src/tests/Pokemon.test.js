import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Pokemon } from '../components';

const mockedPokemon = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 45',
      map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
    },
    {
      location: 'Johto Dragon\'s Den',
      map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
    },
  ],
  // summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.',
};

// const favorite = {
//   4: true,
//   10: false,
//   23: false,
//   25: true,
//   65: false,
//   78: false,
//   143: false,
//   148: true,
//   151: false,
// };

const pokemonNameTestId = 'pokemon-name';
const pokemonTypeTestId = 'pokemon-type';
const pokemonWeightTestId = 'pokemon-weight';

describe('Test Pokemon.js', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Dragonair');

    const pokemonType = screen.getByTestId(pokemonTypeTestId);
    expect(pokemonType.textContent).toBe('Dragon');

    const pokemonWeight = screen.getByTestId(pokemonWeightTestId);
    expect(pokemonWeight.textContent).toBe('Average weight: 16.5 kg');

    const pokemonImage = screen.getByAltText('Dragonair sprite');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });

  test('Se o card do Pokémon indicado contém um link para exibir detalhes', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />
      </Router>,
    );

    const details = screen.getByRole('link');
    expect(details).toBeInTheDocument();

    fireEvent.click(details);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/148');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ mockedPokemon } isFavorite />
      </Router>,
    );

    const favorite = screen.getByAltText('Dragonair is marked as favorite');
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toContain('/star-icon.svg');
  });
});
