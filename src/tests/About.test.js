import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('"About" page testing', () => {
  it('contains Pokédex information', () => {
    render(<About />);
    const aboutPokedexText = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPokedexText).toBeInTheDocument();
  });
  it('contains "About Pokédex" as "h2"', () => {
    render(<About />);
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });
  it('contains two paragraphs about pokédex informations', () => {
    render(<About />);
    const firstParagraphText = screen.getByText(/application simulates a Pokédex/i);
    const secondParagraphText = screen.getByText(/can filter Pokémons by type/i);
    expect(firstParagraphText).toBeInTheDocument();
    expect(secondParagraphText).toBeInTheDocument();
  });
  it('contains Pokédex img', () => {
    render(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg)
      .toHaveAttribute(
        'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
  });
});
