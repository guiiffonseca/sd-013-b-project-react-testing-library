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
    const primeiroParagrafo = screen.getByText(/This application simulates a Pokédex/);
    const segundoParagrafo = screen.getByText(/One can filter Pokémons by type/);
    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrafo).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma pokedex', () => {
    render(<About />);
    const Pokedeximg = screen.getByRole('img');
    expect(Pokedeximg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(Pokedeximg).toHaveAttribute('alt', 'Pokédex');
  });
});
