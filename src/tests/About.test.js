import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from '../components/About';

describe('contain informations about the Pokédex', () => {
  it('should have an h2 heading with the text "About Pokédex"', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutText).toBeInTheDocument();
  });

  it('should have 2 paragraphs with texts about the Pokédex', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const twoParagraphs = screen.getAllByText(/Pokémons/);
    expect(twoParagraphs.length).toBe(2);
  });

  it('should contain a Pokédex image', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.src).toContain('Pok%C3%A9dex.png');
  });
});
