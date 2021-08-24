import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa se o component About contem informações sobre a Pokédex.', () => {
  it('Se a página contem um Heading h2 com o texto ABOUT POKÉDEX', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /about Pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Se a página contem 2 parágrafos com informações da Pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/This application/i);
    const p2 = screen.getByText(/One can filter/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Se a página contem uma imagem com um SRC especifico.', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText(/Pokédex/i);
    expect(img).toHaveAttribute('src', url);
  });
});
