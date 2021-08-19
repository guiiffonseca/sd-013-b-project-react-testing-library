import { screen, render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Teste do About', () => {
  test('Teste se há informacoes sobre a Pokedex,', () => {
    render(<About />);
    const aboutMeText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutMeText).toBeInTheDocument();
  });

  test('Teste se há dois paragrafos na tela', () => {
    render(<About />);
    const paragraf1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraf2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraf1).toBeInTheDocument();
    expect(paragraf2).toBeInTheDocument();
  });

  test('Teste se há uma imagem na tela', () => {
    render(<About />);
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
