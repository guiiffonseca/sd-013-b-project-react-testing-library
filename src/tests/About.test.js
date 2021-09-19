import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('Teste do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    expect(screen
      .getByRole('heading', { level: 2, name: /about pokédex/i })).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    expect(screen.getByText(/This application simulates a Pokéd/i)).toBeInTheDocument();
    expect(screen.getByText(/ne can filter Pokémons by typ/i)).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
