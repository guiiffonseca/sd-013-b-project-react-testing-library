import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from '../utils/renderWithRouter';

describe('About.js tests', () => {
  test('Page has informations about the Pokédex', () => {
    renderWithRouter(<About />);
    const info = screen.getByText(/a digital encyclopedia/i);
    expect(info).toBeInTheDocument();
  });

  test('Page has a header "About Pokédex"', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(header).toBeInTheDocument();
  });

  test('Page has two paragraphs of text about Pokedex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/poké/i);
    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });

  test('Page has a Pokedex image', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
