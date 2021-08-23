import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do component <About.js />', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/This application simulates/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img').src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
