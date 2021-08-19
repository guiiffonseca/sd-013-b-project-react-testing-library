import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

describe('Testando o componente <About.js />', () => {
  test('Testa se existe um h2 com o texto "About Pokédex" ', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
