import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';

const pokemonsMock = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: { value: '2.9', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: { value: '48.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: { value: '4.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: { value: '95.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: { value: '460.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: { value: '16.5', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  },
];

const isPokemonFavoriteByIdMock = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

function getPokemonName() {
  return screen.getByTestId('pokemon-name');
}

function getPokemonType() {
  return screen.getByTestId('pokemon-type');
}

function getPokemonWeight() {
  return screen.getByTestId('pokemon-weight');
}

function getPokemonImg() {
  return screen.getByRole('img');
}

function getPokemonLinkDetail() {
  return screen.getByRole('link', {
    name: /more details/i,
  });
}

describe('Teste o componente <Pokemon.js />', () => {
  test('é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <Pokemon
          pokemon={ pokemonsMock[0] }
          isFavorite={ isPokemonFavoriteByIdMock[pokemonsMock[0].id] }
        />
      </MemoryRouter>,
    );

    expect(getPokemonName()).toHaveTextContent(pokemonsMock[0].name);
    expect(getPokemonType()).toHaveTextContent(pokemonsMock[0].type);
    const { value, measurementUnit } = pokemonsMock[0].averageWeight;
    expect(getPokemonWeight())
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(getPokemonImg()).toHaveAttribute('src', pokemonsMock[0].image);
    expect(getPokemonImg()).toHaveAttribute('alt', `${pokemonsMock[0].name} sprite`);
  });
});

describe('O card do Pokémon contém um link de navegação para exibir detalhes', () => {
  test(' O link deve possuir a URL /pokemons/<id>', () => {
    render(
      <MemoryRouter>
        <Pokemon
          pokemon={ pokemonsMock[0] }
          isFavorite={ isPokemonFavoriteByIdMock[pokemonsMock[0].id] }
        />
      </MemoryRouter>,
    );

    expect(getPokemonLinkDetail())
      .toHaveAttribute('href', `/pokemons/${pokemonsMock[0].id}`);
  });
});

// describe('ao clicar no link de navegação do Pokémon, é feito o redirecionamento ', () => {
//   test('Página de detalhes', async () => {
//     render(
//       <MemoryRouter>
//         <Pokemon
//           pokemon={ pokemonsMock[0] }
//           isFavorite={ isPokemonFavoriteByIdMock[pokemonsMock[0].id] }
//         />
//       </MemoryRouter>,
//     );

//     userEvent.click(getPokemonLinkDetail());
//     const pikachuDetail = await screen.findByRole('heading', {
//       level: 2,
//       name: 'Pikachu Details',
//     });
//     // expect(pikachuDetail).toBeInTheDocument();
//     // expect(headingDetail).toHaveTextContent(`${pokemonsMock[0].name} Details`);
//   });
// });

// describe('', () => {
//   test('', () => {});
// });
