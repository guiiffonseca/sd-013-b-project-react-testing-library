import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';

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

describe(' Teste o componente <Pokedex.js />', () => {
  test('contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </MemoryRouter>,
    );

    const h2PokedexPage = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(h2PokedexPage).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando clicar Próximo', () => {
  test('botão Próximo pokémon e exibir todos os pokenos', () => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </MemoryRouter>,
    );

    const buttonProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonProximoPokemon).toBeInTheDocument();

    const namePokemon = getPokemonName();
    // const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(pokemonsMock[0].name);
    for (let index = 0; index < pokemonsMock.length; index += 1) {
      userEvent.click(buttonProximoPokemon);
    }
    expect(namePokemon).toHaveTextContent(pokemonsMock[0].name);
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  test('é mostrado apenas um Pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </MemoryRouter>,
    );

    const allNamePokemon = screen.getAllByTestId('pokemon-name');
    expect(allNamePokemon.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('se a Pokédex tem os botões de filtro', () => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </MemoryRouter>,
    );

    const pokemonsTypes = [...new Set(pokemonsMock
      .reduce((types, { type }) => [...types, type], []))];

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const buttonPokemonsTypes = screen.getAllByTestId('pokemon-type-button');
    for (let index = 0; index < buttonPokemonsTypes.length; index += 1) {
      for (let index2 = 0; index2 < buttonPokemonsTypes.length; index2 += 1) {
        if (index !== index2) {
          expect(buttonPokemonsTypes[index]).not.toBe(buttonPokemonsTypes[index2]);
        }
      }
    }

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const firePokemon = pokemonsMock.filter((pokemon) => pokemon.type === 'Fire');
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(buttonFire);
    const namePokemon = getPokemonName();
    expect(namePokemon).toHaveTextContent(firePokemon[0].name);
    const buttonProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonProximoPokemon);
    expect(namePokemon).toHaveTextContent(firePokemon[1].name);

    // O botão All está sempre visível
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();

    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    for (let index = 0; index < pokemonsTypes.length; index += 1) {
      expect(buttonPokemonsTypes[index]).toHaveTextContent(pokemonsTypes[index]);
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </MemoryRouter>,
    );

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const buttonProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const namePokemon = getPokemonName();
    // const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(pokemonsMock[0].name);
    for (let index = 0; index < pokemonsMock.length; index += 1) {
      userEvent.click(buttonProximoPokemon);
    }
    expect(namePokemon).toHaveTextContent(pokemonsMock[0].name);
  });
});
