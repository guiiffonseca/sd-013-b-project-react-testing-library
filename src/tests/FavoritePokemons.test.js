import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testando component FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const Poke = screen.getByText('No favorite pokemon found');
    expect(Poke).toBeInTheDocument();
  });

  test('Teste detalhes do pokemon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkDetails);

    const pokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(pokemon);
  });

  test('Testa o link para pokemons favoritos', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);
  });

  test('Testa se tem pokemon favorito', () => {
    renderWithRouter(<App />);
    const FavoritePoke = screen.getAllByTestId('pokemon-name');
    expect(FavoritePoke.length).toBe(1);
  });

  test('Testa botao next', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNext);
  });
});
