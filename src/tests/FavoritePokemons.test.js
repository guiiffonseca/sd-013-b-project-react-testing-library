import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

// Teste o componente <FavoritePokemons.js />
describe('Test FavoritePokemons Component', () => {
  // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  test('if message appear "No favorite pokemon found" when there is no favorite', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  // Teste se é exibido todos os cards de pokémons favoritados.
  test('if there is a favorite pokemon after select it', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
