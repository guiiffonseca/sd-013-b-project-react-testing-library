import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('About test', () => {
  test('página possui texto "This application"', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/this application/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('página possui texto "About Pokedéx"', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('página possui imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImg).toBeInTheDocument();
  });
});
