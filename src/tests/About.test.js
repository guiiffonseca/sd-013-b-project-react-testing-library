import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Testar se o componente contém as informações sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const pokedex = screen.getByRole('heading', {
      level: 2,
      name: /pokédex/i,
    });
    expect(pokedex).toBeInTheDocument();
  });

  test('Testar se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Testar se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const upperP = screen.getByText(/this application simulates/i);
    const lowerP = screen.getByText(/one can filter/i);
    expect(upperP).toBeInTheDocument();
    expect(lowerP).toBeInTheDocument();
  });

  test('Testar se a página contém uma imagem', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
