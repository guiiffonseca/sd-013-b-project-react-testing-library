import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p = screen.getAllByText(/Pokémons/i);
    expect(p.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
