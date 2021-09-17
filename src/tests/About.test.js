import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

const CONTEXT_HEADER = /One can filter Pokémons by type/;
const POKEDEX_ABOUT = 'About Pokédex';
const CONTEXT_P1 = (
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
const CONTEXT_P2 = (
  'One can filter Pokémons by type, and see more details for each one of them');
const IMG_PATH = (
  'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

describe('Teste o componente About', () => {
  it('Se contem Pokédex infos', () => {
    render(<About />);
    const info = screen.getByText(CONTEXT_HEADER);
    expect(info).toBeInTheDocument();
  });
  it('Se contem um heading', () => {
    render(<About />);
    const heading = screen.getByText(POKEDEX_ABOUT);
    expect(heading).toBeInTheDocument();
  });
  it('Se contem paragrafos', () => {
    render(<About />);
    const pFirst = screen.getByText(CONTEXT_P1);
    expect(pFirst).toBeInTheDocument();
    const pSecond = screen.getByText(CONTEXT_P2);
    expect(pSecond).toBeInTheDocument();
  });
  it('Se contem imagem', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toEqual(IMG_PATH);
  });
});
