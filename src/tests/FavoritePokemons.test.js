import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons.js', () => {
  test('Exibe "No favorite pokemon found", se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${pokemons[0].id}`);

    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemon);

    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemon);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  // test('Jeito de fazer o teste de cima que o Rodrigo me ensinou', () => {
  //   Envia os pokemons como props
  //   renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  //   Captura todos os names do pokemon
  //   const pokemonCard = screen.findAllByTestId('pokemon-name');

  //   Verifica se o retorno é diferente de 0
  //   expect(pokemonCard.length).not.toBe(0);
  // });
});
