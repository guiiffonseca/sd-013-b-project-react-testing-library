import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('About test', () => {
  test('A página deve ter informações sobre a Pokedéx', () => {
    renderWithRouter(<About />);

    const linkAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(linkAbout).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const number = 2;
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(number);
  });

  test('Teste se a página contém a imagem da pokédex', () => {
    renderWithRouter(<About />);
    const imgCode = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', imgCode);
  });
});
