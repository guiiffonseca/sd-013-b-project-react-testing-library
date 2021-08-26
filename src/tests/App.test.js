import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa link', () => {
  test('testa link Home', () => {
    renderWithRouter(<App />);
    const textHome = screen.getByRole('link', { name: 'Home' });
    expect(textHome).toBeInTheDocument();
  });

  test('testa link Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const textFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(textFavorite).toBeInTheDocument();
  });

  test('testa link About', () => {
    renderWithRouter(<App />);
    const textAbout = screen.getByRole('link', { name: 'About' });
    expect(textAbout).toBeInTheDocument();
  });
});

// https://testing-library.com/docs/example-react-router/ ;
