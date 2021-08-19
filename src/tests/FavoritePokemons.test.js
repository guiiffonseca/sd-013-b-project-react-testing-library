import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o FavoritePokemons.js', () => {
  test('Testa se é exibido a msm No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });
});
