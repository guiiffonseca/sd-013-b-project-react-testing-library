import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa a pagina de favoritos', () => {
  it('Renderiza a mensagem de quando nao houver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const mesage = screen.getByText('No favorite pokemon found');
    expect(mesage).toBeInTheDocument();
  });
});
