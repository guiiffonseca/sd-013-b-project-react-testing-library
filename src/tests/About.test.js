import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import { About } from '../components';

describe('Testes About', () => {
  test('Testa se existe textos e imagem na tela', () => {
    RenderWithRouter(<About />);

    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  test('Testa se a imagem existe', () => {
    RenderWithRouter(<About />);

    const immage = screen.getByRole('img');

    expect(immage).toBeInTheDocument();
    expect(immage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(immage).toHaveAttribute('alt', 'Pokédex');
  });
});
