import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const veriMessage = screen.getByText(/No favorite pokemon found/i);
    expect(veriMessage).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const clickFavorite = screen.getByRole('checkbox');
    userEvent.click(clickFavorite);
    const weigth = screen.getByText(/Average weight:/i);
    expect(weigth).toBeInTheDocument();
  });
});
