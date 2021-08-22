import React from 'react';

import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test the component <FavoritePokemons.js />', () => {
  it('show the message No favorite pokemon found, if there are no favorites', () => {
    // Render:
    renderWithRouter(<FavoritePokemons />);

    // Get the elements and then test if they exist in the document:
    const NoFavorites = screen.getByText('No favorite pokemon found');
    expect(NoFavorites).toBeInTheDocument();
  });
});
