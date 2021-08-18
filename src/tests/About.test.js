import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing component About.js', () => {
  it('Should contain heading h2 with text About Pokedex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Should contain two paragraphs about the pokedex', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Should contain a image of the pokedex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
