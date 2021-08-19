import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2. Testa o componente <About.js />.', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(headingAbout).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex,/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type,/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Testa se a página contém imagem de uma Pokédex com URL dada', () => {
    renderWithRouter(<About />);
    const pokedexImageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toBe(pokedexImageUrl);
  });
});
