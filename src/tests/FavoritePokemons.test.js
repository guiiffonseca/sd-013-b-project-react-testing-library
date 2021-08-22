import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const infoPokemons = screen.getByText('No favorite pokemon found');
    expect(infoPokemons).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const charmanderId = 4;
    const rapidashId = 78;

    const favoritePokemons = pokemons.filter(
      (pokemon) => pokemon.id === charmanderId || pokemon.id === rapidashId,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const charmanderName = screen.getByText('Charmander');
    expect(charmanderName).toBeInTheDocument();
    const rapidashName = screen.getByText('Rapidash');
    expect(rapidashName).toBeInTheDocument();

    const pokemonName = screen.getAllByTestId('pokemon-name');
    const pokemonType = screen.getAllByTestId('pokemon-type');
    const pokemonWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonName).toBeTruthy();
    expect(pokemonType).toBeTruthy();
    expect(pokemonWeight).toBeTruthy();
  });
});
