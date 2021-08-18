import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import About from '../components/About';
import renderWithRouter from './helpers/renderWithRouter';

describe('About.js tests', () => {
  test('The page contains informations about the Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/a digital encyclopedia/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('The page contains a header "About Pokédex"', () => {
    renderWithRouter(<About />);

    const pokedexHeader = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pokedexHeader).toBeInTheDocument();
  });
});
