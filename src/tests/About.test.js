import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Testes About.js', () => {
  test('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Verifica se a página contém dois parágrafos falando sobre a pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutTextOne = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/,
    );
    const aboutTextTwo = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/,
    );
    expect(aboutTextOne).toBeInTheDocument();
    expect(aboutTextTwo).toBeInTheDocument();
  });
  test('Verifica se a página contém uma imagem com uma URL específica', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
