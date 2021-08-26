import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test do componente <FavoritePokemons />', () => {
  test('Exibe o texto "No favorite pokemon found" se não houver nenhum salvo', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Todos os cards de Pokémon são exibidos', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokeDetails);

    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const favLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favLink);
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
