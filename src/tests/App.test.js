import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('se o primeiro link contem o texto "Home" ', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(home).toBeInTheDocument();
});

test('se o primeiro link contem o texto "About" ', () => {
  renderWithRouter(<App />);
  const About = screen.getByRole('link', {
    name: /About/i,
  });
  expect(About).toBeInTheDocument();
});

test('se o primeiro link contem o texto "Favorite Pokémons" ', () => {
  renderWithRouter(<App />);
  const FavoritePokemon = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(FavoritePokemon).toBeInTheDocument();
});
