import React from 'react';
import { screen } from '@testing-library/react';

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

  test('The page contains two paragraphs of text about Pokedex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/poké/i);

    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });

  test('The page contains a Pokedex image', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
