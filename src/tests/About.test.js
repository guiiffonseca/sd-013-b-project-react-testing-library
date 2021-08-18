import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('Testa se o about tem informações sobre PokeDex', () => {
    renderWithRouter(<About />);
    const infosPokeDex = screen.getByText(/application simulates a Pokédex/i);
    expect(infosPokeDex).toBeInTheDocument();
  });
  test('testa se a página contém um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const textAboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textAboutPokedex).toBeInTheDocument();
  });
  test('Testa se a página contém 2 parágrafos com texto sobre Pokedex', () => {
    renderWithRouter(<About />);
    const paragraphsText = screen.getAllByText(/,/);
    expect(paragraphsText.length).toBe(2);
  });
  test('Testa se contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const srcIMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toBe(srcIMG);
  });
});
