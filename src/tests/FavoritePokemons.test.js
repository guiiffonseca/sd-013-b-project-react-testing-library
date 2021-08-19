import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('Testando o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
