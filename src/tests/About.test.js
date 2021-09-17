import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';

const CONTEXT_HEADER = /One can filter Pokémons by type/;
const POKEDEX_ABOUT = 'About Pokédex';
// const CONTEXT_P = 'About Pokédex';

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
});
