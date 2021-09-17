import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';

const CONTEXT_HEADER = /One can filter Pokémons by type/;
const POKEDEX_HEADER = 'About Pokédex';

describe('Teste o componente About', () => {
  it('Se contem Pokédex infos', () => {
    render(<About />);
    const info = screen.getByText(CONTEXT_HEADER);
    expect(info).toBeInTheDocument();
  });
});
