import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a pagina contém informações sobre pokédex', () => {
    // Renderiza :
    renderWithRouter(<About />);
    // testes :
    expect(screen.getAllByText(/Pokédex/i)[0]).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // Renderiza :
    renderWithRouter(<About />);
    // Acessa :
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    // testes:
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém 2 paragrafos com texto sobre Pokédex', () => {
    // renderiza :
    renderWithRouter(<About />);
    // testes :
    expect(screen.getAllByText(/Pokédex/i).length).toBe(2);
  });

  test('Teste se a página contém Imagem de uma Pokédex', () => {
    // renderiza:
    renderWithRouter(<About />);
    // acessa  por src:
    const image = screen.getByAltText('Pokédex');
    // testes :
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
