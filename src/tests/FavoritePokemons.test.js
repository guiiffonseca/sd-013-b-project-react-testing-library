import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utilities/renderWithRouter';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  test('Teste se "No favorite pokemon found." aparece se não tem favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    // Realizei o passo a passo da página para verificar se o Pokemon está sendo favoritado
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const checkPokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkPokemon).toBeInTheDocument();
    userEvent.click(checkPokemon);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
  });
});
