import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe(' 3. Testa o componente <FavoritePokemons.js />', () => {
  it('Testa a mensagem `No favorite pokemon found`.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMessage = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
