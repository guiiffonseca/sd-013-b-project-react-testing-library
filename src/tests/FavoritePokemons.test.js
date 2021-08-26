import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test FavoritePokemons', () => {
  test('No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
});

// npx stryker run ./stryker/FavoritePokemons.conf.json
