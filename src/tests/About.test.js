import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testa a página que descreve a Pokédex', () => {
  it('Testa se contém o Heading', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 }, { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se contém dois parágrafos com informações', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Testa a imagem renderizada', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
