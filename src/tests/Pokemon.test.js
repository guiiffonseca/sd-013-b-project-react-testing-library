// npx stryker run ./stryker/Pokemon.conf.json

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('6 - Test component \'Pokemon\'', () => {
  pokemons.map((pokemon, index) => {
    test(`find all data-testids when ${pokemon.name} is rendered`, () => {
      const { history } = renderWithRouter(<App />);
      for (let count = 0; count < index; count + 1) {
        const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
        userEvent.click(nextPokemon);
      }
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const img = screen.getByRole('img', {
        src: `${pokemon.image}`,
        alt: `${pokemon.name}`,
      });
      expect(pokemonName).toBeDefined();
      expect(pokemonType).toHaveTextContent(`${pokemon.type}`);
      expect(pokemonWeight).toBeDefined();
      expect(img).toBeDefined();
      expect(img).toHaveProperty('alt', `${pokemon.name} sprite`);
      expect(img.src).toStrictEqual(`${pokemon.image}`);
      expect(pokemonWeight).toHaveTextContent(
        `${pokemonWeight.innerHTML}`,
      );
      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);
      expect(linkDetails).toHaveTextContent('More details');
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);
      const favoriteCheck = screen.getByRole('checkbox', { id: /favorite/i });
      userEvent.click(favoriteCheck);
      expect(favoriteCheck.checked).toBe(true);
      const favoriteImage = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(favoriteImage.alt).toStrictEqual(`${pokemon.name} is marked as favorite`);
      expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
    });
    return index;
  });
});
