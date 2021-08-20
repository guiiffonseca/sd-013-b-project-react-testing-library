import React from 'react';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    RouterMemory(<FavoritePokemons />);

    expect(screen.getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
});
