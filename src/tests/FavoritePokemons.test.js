import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithrouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/favorite/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/details/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(screen.getByText(/Pokémon favoritado?/i));
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const pikachuFavorited = screen.getByText('Pikachu');
    expect(pikachuFavorited).toBeInTheDocument();
  });
});
