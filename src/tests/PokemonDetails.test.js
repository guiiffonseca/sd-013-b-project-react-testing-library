// npx stryker run ./stryker/PokemonDetails.conf.json

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
// import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('7 - Test component \'PokemonDetails\'', () => {
  test('go to details and check summary and its text', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { name, summary } = pokemons[0];
    const pokemonDetailsTitle = screen.getByRole(
      'heading', { level: 2, name: `${name} Details` },
    );
    expect(pokemonDetailsTitle).toBeDefined();
    const pokemonSumary = screen.getByRole(
      'heading', { level: 2, name: 'Summary' },
    );
    expect(pokemonSumary).toBeDefined();
    const summaryText = screen.getByText(summary);
    expect(summaryText).toHaveTextContent(summary);
  });
  test('maps image and title game location to match the pokemon chosen', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { name, foundAt } = pokemons[0];
    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemon).toBeDefined();
    const images = screen.getAllByRole('img', {
      alt: `${name} location`,
    });
    console.log(images[1].alt);
    expect(images[1].src).toBe(foundAt[0].map);
    expect(images[2].src).toBe(foundAt[1].map);
    expect(images[1].alt).toBe('Pikachu location');
    expect(images[2].alt).toBe('Pikachu location');
    const gameLocation = screen.getByText('Game Locations of Pikachu');
    expect(gameLocation).toBeDefined();
  });
});
