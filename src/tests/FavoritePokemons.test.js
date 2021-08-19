import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';

describe('if component FavoritePokemons.js is working properly', () => {
  it('should display message "No favorite pokemon found" if no favorited pokémon', () => {
    render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);

    const noFavText = screen.getByText('No favorite pokemon found');
    expect(noFavText).toBeInTheDocument();
  });
});
