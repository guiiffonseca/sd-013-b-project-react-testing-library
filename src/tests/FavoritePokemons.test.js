import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('Testes FavoritePokémons', () => {
  test('Verifica se é exibido na tela No favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const favoriteText = screen.getByText('No favorite pokemon found');
    expect(favoriteText).toBeInTheDocument();
  });
  test('Verifica se todos os cards de pokémons favoritados são exibidos', () => {

  });
});
