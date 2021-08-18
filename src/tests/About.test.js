import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('Testes da tela About', () => {
  it('Test Heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  it('Test paragraph', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph = screen.getAllByText(/Pokémons/);
    expect(paragraph.length).toBe(2);
  });
  it('Test img', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
