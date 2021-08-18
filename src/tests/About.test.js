import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Component About tests', () => {
  it('should have a heading with text about pokédex', () => {
    render(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('should have two paragraphs with text about pokédex', () => {
    render(<About />);

    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('should have a image of a pokédex', () => {
    render(<About />);

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
