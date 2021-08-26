import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('A página contém info sobre a pokédex', () => {
    expect(screen.getAllByText(/Pokédex/i)[0]).toBeInTheDocument();
  });

  test('A página contém um h2 com o texto About Pokédex', () => {
    const termo = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(termo).toBeInTheDocument();
  });

  test('A página contém dois parágrafos sobre Pokédex', () => {
    expect(screen.getAllByText(/Pokédex/i).length.toBe(2));
  });

  test('A página contém uma imagem de uma Pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
