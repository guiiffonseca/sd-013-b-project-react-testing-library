import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('2 - Verifica se renderiza a pagina "About', () => {
  test('Teste se a página contém um titulo sobre o pokemon', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos sobre a pokédex.', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/This application simulates/i))
      .toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons/i))
      .toBeInTheDocument();
  });

  test('Teste se a pagina contem uma imagem', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img').src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
