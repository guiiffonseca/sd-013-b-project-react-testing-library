import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  describe('Teste se a página contém as informações sobre a Pokédex.', () => {
    test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
      renderWithRouter(<About />);
      const pageTitle = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      expect(pageTitle).toBeInTheDocument();
    });
    test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
      renderWithRouter(<About />);
      const firstParagraphContent = /This application simulates a Pokédex,/i;
      const secondParagraphContent = /One can filter Pokémons by type/i;
      const firstParagraph = screen.getByText(firstParagraphContent);
      const secondParagraph = screen.getByText(secondParagraphContent);
      expect(firstParagraph).toBeInTheDocument();
      expect(secondParagraph).toBeInTheDocument();
    });
    test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
      renderWithRouter(<About />);
      const pokedexImage = screen.getByRole('img');
      const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      expect(pokedexImage).toBeInTheDocument();
      expect(pokedexImage.alt).toBe('Pokédex');
      expect(pokedexImage.src).toBe(imageSource);
    });
  });
});
