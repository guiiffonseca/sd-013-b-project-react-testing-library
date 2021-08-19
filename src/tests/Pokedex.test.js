import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of Pokedex.test.js', () => {
  test('if the heading h2 has the text Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeadingH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexHeadingH2).toBeInTheDocument();
  });

  // test('if the next pokémon button is working correctly', () => {

  // })
});
