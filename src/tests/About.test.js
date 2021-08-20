import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste componente About', () => {
  it('A página deve conter um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const infos = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(infos).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/containing all Pokémons/);
    const paragraph2 = screen.getByText(/filter Pokémons/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('A página deve conter uma imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
