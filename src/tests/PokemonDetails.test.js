import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('PokemonDetails.js Tests', () => {
  let history;

  const {
    id,
    name,
    summary,
    foundAt,
  } = pokemons[0];

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    history.push(`/pokemons/${id}`);
  });

  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const detailsText = screen.getByText(new RegExp(`${name} details`, 'i'));
    const summaryHeading = screen.getAllByRole('heading', { level: 2 });

    const summaryHeadingPresent = Array.from(summaryHeading).some(
      (h2) => /summary/i.test(h2.innerHTML),
    );

    expect(detailsText).toBeInTheDocument();
    expect(() => screen.getByText('More details')).toThrow();
    expect(summaryHeadingPresent).toBeTruthy();
    expect(() => screen.getByText(summary)).not.toThrow();
  });

  test('Teste se existe uma seção com os mapas das localizações do pokémon', () => {
    const pokemonLocationsHeading = screen.getAllByRole('heading', { level: 2 });
    const pokemonLocationsMaps = screen.getAllByRole('img');

    const pokemonLocationsHeadingPresent = Array.from(pokemonLocationsHeading).some(
      (h2) => {
        const testRegex = new RegExp(`Game Locations of ${name}`, 'i');
        return testRegex.test(h2.innerHTML);
      },
    );

    const pokemonLocationsMapsPresent = foundAt.every(({ map }) => (
      Array.from(pokemonLocationsMaps).some(
        (img) => {
          const testSrc = new RegExp(map, 'i');
          const testAlt = new RegExp(`${name} location`, 'i');
          return testSrc.test(img.src) && testAlt.test(img.alt);
        },
      )
    ));

    expect(pokemonLocationsHeadingPresent).toBeTruthy();
    expect(pokemonLocationsMapsPresent).toBeTruthy();
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    const favoriteCheck = screen.getByRole('checkbox');
    const getFavIcon = () => screen.getByAltText(`${name} is marked as favorite`);

    expect(getFavIcon).toThrow();

    userEvent.click(favoriteCheck);

    expect(getFavIcon).not.toThrow();
  });
});
