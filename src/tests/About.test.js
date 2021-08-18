import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('About.js tests', () => {
  test('Verifica se há informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/filter Pokémons by type/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Verifica se há um heading na página', () => {
    renderWithRouter(<About />);

    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pokedexText).toBeInTheDocument();
  });

  test('Verifica se há 2 parágrafos na página', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/poké/i);

    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });

  test('Verifica se há uma imagem da Pokédex na página', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
