import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('se o primeiro link contem o texto "Home" ', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const home = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(home).toBeInTheDocument();
});

test('se o primeiro link contem o texto "About" ', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const About = screen.getByRole('link', {
    name: /About/i,
  });
  expect(About).toBeInTheDocument();
});

test('se o primeiro link contem o texto "Favorite Pokémons" ', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const FavoritePokemon = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(FavoritePokemon).toBeInTheDocument();
});
