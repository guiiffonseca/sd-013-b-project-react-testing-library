import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('FavoritePokemons.js tests.', () => {
  it(`Ao entrar na página verifica se é exibido na tela a mensagem 
  "No favorite pokemon found", se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const NoFavoriteText = screen.getByText('No favorite pokemon found');
    expect(NoFavoriteText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se é exibido 
  todos os cards de pokémons favoritados.`, () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);

    const linkDetailsText = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetailsText);

    const addFavoriteText = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(addFavoriteText);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemon);

    const pokemonCard = screen.getAllByTestId('pokemon-name');

    expect(pokemonCard.length).toBe(1);
  });
});
