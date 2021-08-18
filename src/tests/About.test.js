// commit inicial :rocket:
import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const titleAboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(titleAboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
  });
});
