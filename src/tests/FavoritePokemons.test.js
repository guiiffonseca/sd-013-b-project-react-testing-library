import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste No Favorite pokemon found', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found, se a 
  pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const textNot = screen.getByText('No favorite pokemon found');
    expect(textNot).toBeInTheDocument();
  });

  test('Testa mais detalhes do pokemon', () => {
    renderWithRouter(<App />);
    const linkMoreDetail = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkMoreDetail);

    const pokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(pokemon);
  });

  test('Verifica redirecionamento parapokemons favoritos', () => {
    renderWithRouter(<App />);
    const redirectFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(redirectFavorites);
  });

  test('Verifica se há um pokemon favorito', () => {
    renderWithRouter(<App />);
    const pokemonFavorite = screen.getAllByTestId('pokemon-name');
    expect(pokemonFavorite.length).toBe(1);
  });

  test('Testa botão de next', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);
  });
});
