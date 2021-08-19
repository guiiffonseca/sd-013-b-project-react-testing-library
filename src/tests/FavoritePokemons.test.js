import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import Data from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('se é exibido na tela a mensagem No favorite pokemon found...', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const notFoundText = screen.getByText(/No favorite pokemon found/);
    expect(notFoundText).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ Data } />
      </MemoryRouter>,
    );

    const arrayLength = Data.length;
    const image = screen.getAllByAltText(/is marked as favorite/);
    expect(image).toHaveLength(arrayLength);
  });
});
