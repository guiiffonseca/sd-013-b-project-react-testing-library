import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testa página About', () => {
  it('deve rederizar informações sobre a pokedex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByText(/This application simulates a Pokédex/i);

    expect(aboutPokedex).toBeInTheDocument();
  });
  it('deve possuir um heading h2', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('deve conter dois paragrafos de informações sobre a pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémon/i);
    expect(paragraphs).toHaveLength(2);
  });
  it('deve conter uma imagem com determinanda fonte', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src)
      .toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
