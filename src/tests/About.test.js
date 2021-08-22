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
  test('Se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const infoPokemons = screen.getByText(/can filter Pokémons/i);
    expect(infoPokemons).toBeInTheDocument();
  });

  test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
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

  test('Se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
