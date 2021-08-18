import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons', () => {
  test('verifica se é exibido na tela No Favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('verifica se é exibido na tela o pokemon favoritado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', {
      name: /details/,
    });
    userEvent.click(detailsLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    const favoriteButton = screen.getByRole('checkbox', {
      checked: false,
    });
    userEvent.click(favoriteButton);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
