import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando página about requisito 2', () => {
  test('Testa se a página contem as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('se contém 2 parágrafos com texto sobre pokemon', () => {
    render(<About />);
    const primeiro = screen.getByText(/This application simulates a Pokédex/);
    const segundo = screen.getByText(/One can filter Pokémons by type/);
    expect(primeiro).toBeInTheDocument();
    expect(segundo).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma pokedex', () => {
    render(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imagem).toHaveAttribute('alt', 'Pokédex');
  });
});
