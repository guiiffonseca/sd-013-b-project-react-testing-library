import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Favorite Pokémons page tests', () => {
  test('If the page is empty', () => {
    render(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  test('If favorite pokémon page has something after user interaction', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const input = screen.getByLabelText(/pokémon favoritado?/i);
    expect(input).toBeInTheDocument();
    userEvent.click(input);

    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
