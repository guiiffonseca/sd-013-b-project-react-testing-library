import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Requisito 3', () => {
  test('Teste se a pessoa não tem pokémons favoritos', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const NotFavorite = screen.getByText(/No favorite pokemon found/i);

    expect(NotFavorite).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    render(
      <MemoryRouter initialEntries={ ['/pokemons/4'] }>
        <App />
      </MemoryRouter>,
    );

    const getLabel = screen.getByLabelText(/Pokémon favoritado/i);
    expect(getLabel).toBeInTheDocument();

    userEvent.click(getLabel);
    const getTextFavorite = screen.getByText(/Favorite Pokémons/i);
    expect(getTextFavorite).toBeInTheDocument();
  });
});
