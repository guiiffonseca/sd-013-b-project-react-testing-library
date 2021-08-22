import React from 'react';
// import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const infoPokemons = screen.getByText(/can filter Pokémons/i);
    expect(infoPokemons).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const AboutPageText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(AboutPageText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
  });
});
