// npx stryker run ./stryker/Pokemon.conf.json

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const helper = (index, click) => {
  let number = 0;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
  number += 1;
  if (index > number) { click(); }
};
describe('6 - Test component \'Pokemon\'', () => {
  test('find all data-testids when anyPokemon is rendered', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const img = screen.getByRole('img', {
        src: `${pokemon.image}`,
        alt: `${pokemon.name}`,
      });
      expect(pokemonName).toHaveTextContent(`${pokemon.name}`);
      expect(pokemonType).toHaveTextContent(`${pokemon.type}`);
      expect(img).toBeDefined();
      expect(img).toHaveProperty('alt', `${pokemon.name} sprite`);
      expect(img.src).toStrictEqual(`${pokemon.image}`);
      const { averageWeight: { value, measurementUnit } } = pokemon;
      expect(pokemonWeight.innerHTML).toStrictEqual(
        `Average weight: ${value} ${measurementUnit}`,
      );

      const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextPokemon);
    });
  });
  pokemons.forEach((pokemon, index) => {
    test('find all data-testids when anyPokemon is rendered', () => {
      const { history } = renderWithRouter(<App />);
      const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      const click = () => {
        userEvent.click(nextPokemon);
      };

      helper(index, click);

      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);
      expect(linkDetails).toHaveTextContent('More details');
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);
      const Home = screen.getByRole('link', { name: /home/i });
      userEvent.click(Home);
    });
  });
  pokemons.forEach((pokemon) => {
    test(`find all data-testids when ${pokemon.name} is rendered`, () => {
      renderWithRouter(<FavoritePokemons pokemons={ pokemons } isFavorite />);
      const favoriteImage = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(favoriteImage.alt).toStrictEqual(`${pokemon.name} is marked as favorite`);
      expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
