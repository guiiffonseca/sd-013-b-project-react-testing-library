import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando página about requisito 2', () => {
  it('Testa se a página contem as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('se contém 2 parágrafos com texto sobre pokemon', () => {
    render(<About />);
    const p1Pokedex = screen.getByText(/This application simulates a Pokédex/);
    const p2Pokedex = screen.getByText(/One can filter Pokémons by type/);
    expect(p1Pokedex).toBeInTheDocument();
    expect(p2Pokedex).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma pokedex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
