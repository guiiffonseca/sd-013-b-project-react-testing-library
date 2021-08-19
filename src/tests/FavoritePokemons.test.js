import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste da página FavoritePokemons', () => {
  test('Testa se a msg No Favorite Pokémon Found é exibida', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemon = screen.getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });

  test('Testa se todos os cards são exibidos', () => {
    renderWithRouter(<App />);
    const allCards = screen.getByRole('link', { name: 'More details',
    });
    userEvent.click(allCards);
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons',
    });
    userEvent.click(favoritePokemonsLink);
    const pokemonCard = screen.getByTestId('pokemon-name');
    expect(pokemonCard).toBeInTheDocument();
  });
});
// tentando push 3
