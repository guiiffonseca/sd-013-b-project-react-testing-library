import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';

describe('About.js Tests', () => {
  let history;
  const pokedexData = {
    first: /This application simulates a Pokédex,/,
    second: /One can filter Pokémons by type/,
    imgSRC: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    headingText: 'About Pokédex',
  };

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    history.push('/about');
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const aboutTextHeading = screen.getByRole('heading', { level: 2 });

    expect(aboutTextHeading).toBeInTheDocument();
    expect(aboutTextHeading.innerHTML).toBe(pokedexData.headingText);
  });

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const firstInfo = screen.getByText(pokedexData.first);
    const secondInfo = screen.getByText(pokedexData.second);
    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const firstInfo = screen.getByText(pokedexData.first);
    const secondInfo = screen.getByText(pokedexData.second);
    expect(firstInfo.innerHTML).toMatch(new RegExp(pokedexData.first, 'i'));
    expect(secondInfo.innerHTML).toMatch(new RegExp(pokedexData.second, 'i'));
  });

  test('Teste se a página contém a imagem de uma Pokédex.', () => {
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toMatch(pokedexData.imgSRC);
  });
});
