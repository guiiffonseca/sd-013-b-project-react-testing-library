import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByText(/About Pokédex/);
    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const p = screen.getAllByText(/pokémons/i);
    expect(p).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(imgLink);
  });
});
