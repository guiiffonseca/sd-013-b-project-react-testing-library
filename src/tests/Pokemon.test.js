import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pikachu = pokemons[0];

test('if it renders the correct name', () => {
  // pokemons.forEach((pokemon) => {
  //   renderWithRouter(<Pokemon pokemon={ pokemon } />);
  //   const pokemonName = screen.getByTestId('pokemon-name');
  //   expect(pokemonName).toHaveTextContent(pokemon.name);
  // });
  renderWithRouter(<Pokemon pokemon={ pikachu } />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('if it renders the correct type', () => {
  renderWithRouter(<Pokemon pokemon={ pikachu } />);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent('Electric');
});

test('if it renders the correct average weight', () => {
  renderWithRouter(<Pokemon pokemon={ pikachu } />);
  const { averageWeight: { value, measurementUnit } } = pikachu;
  const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonAverageWeight)
    .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
});

test('if it renders the correct image', () => {
  renderWithRouter(<Pokemon pokemon={ pikachu } />);
  const { name } = pikachu;
  const img = screen.getByAltText(`${name} sprite`);
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('if it renders the correct link', () => {
  const { history } = renderWithRouter(<Pokemon pokemon={ pikachu } />);
  const { id } = pikachu;
  const moreDetails = screen.getByRole('link', {
    name: 'More details',
  });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${id}`);
});

test('if it renders the correct link', () => {
  renderWithRouter(<Pokemon
    pokemon={ pikachu }
    isFavorite
  />);
  const { name } = pikachu;
  const star = screen.getByAltText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  expect(star.src).toBe('http://localhost/star-icon.svg'); // Pq não vai apenas com '/star-icon.svg'?
  expect(star.alt).toBe(`${name} is marked as favorite`);
});
