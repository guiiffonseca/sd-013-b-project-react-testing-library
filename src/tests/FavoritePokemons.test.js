import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Favorite Pokemons page', () => {
  it('should no have any pokemons favorited', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('should have the favorited pokemons by the user', () => {
    const { history } = renderWithRouter(<App />);
    const [pokemon] = pokemons;
    history.push(`/pokemons/${pokemon.id}`);
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
  });
});
