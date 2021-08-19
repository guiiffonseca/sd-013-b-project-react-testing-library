import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do arquivo About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/a digital encyclopedia/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexHeader = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pokedexHeader).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/poké/i);

    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem de Pokedex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
