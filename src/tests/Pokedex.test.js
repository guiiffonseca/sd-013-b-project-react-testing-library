// npx stryker run ./stryker/Pokedex.conf.json

import React from 'react';
import App from '../App';
import funcGetByRole from '../services/funcGetByRole';
import funcGetByTestId from '../services/funcGetByTestId';
import funcClickRoleAll from '../services/funcClickRoleAll';
import pokemons from '../data';

// pokemons={ pokemons }

describe('5 - Test component <App />', () => {
  test('contain h2 and has text \'Encountered pokémons\'', () => {
    funcGetByRole(<App />, 'heading', { level: 2, name: 'Encountered pokémons' });
  });
  test('button has text \'Próximo Pokémon\'', () => {
    funcGetByRole(<App />, 'button', { name: /Próximo Pokémon/i });
  });
  test('clicking \'Próximo Pokémon\' once: must apper Charmander', () => {
    funcClickRoleAll(
      <App />,
      ['button', { name: /Próximo Pokémon/i }],
      ['img', { alt: 'Charmander sprite' }],
      ['toHaveProperty'],
      'name',
    );
  });
  test('clicking \'all\' once: must apper Pikachu first', () => {
    funcClickRoleAll(
      <App />,
      ['button', { name: /all/i }],
      ['img', { alt: 'Pikachu sprite' }],
      ['toHaveProperty'],
      'name',
    );
  });
  test('there is a tag with \'dataTestId={`pokemon-type-button`}\'', () => {
    funcGetByTestId(
      <App />,
      'pokemon-type-button',
      'type',
      ['toBe'],
      'pokemon-type-button',
      'all',
    );
  });

  pokemons.forEach((pokemon) => {
    test(`clicking type button ${pokemon.type} filter pokemons by type`, () => {
      funcClickRoleAll(
        <App />,
        ['button', { name: `${pokemon.type}` }],
        ['img', { alt: `${pokemon.name} sprite` }],
        ['toHaveProperty'],
        'alt',
      );
    });
  });
});
