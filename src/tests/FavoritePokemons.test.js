import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente Favorite Pokemons', () => {
  test('É exibido na tela a mensagem No favorite pokemon found, se não tiver.', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByLabelText(/Pokémon favoritado/));
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
