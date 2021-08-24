import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente About.js', () => {
  it('Testa se a página contém as informações sobre uma Pokédex.', () => {
    renderWithRouter(<About />);
    const infos = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(infos).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
