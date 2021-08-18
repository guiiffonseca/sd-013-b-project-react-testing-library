import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testes da tela About', () => {
  it('Test screen elements', () => {
    render(
      <About />,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    const paragraph = screen.getAllByText(/Pokémons/);
    const img = screen.getByRole('img');
    expect(heading).toBeInTheDocument();
    expect(paragraph.length).toBe(2);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
