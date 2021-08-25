import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../routes/script';

test('O link para a página Home funciona corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const rendersHome = screen.getByRole('link', {
    name: 'Home',
  });
  expect(rendersHome).toBeInTheDocument();
  userEvent.click(rendersHome);
});

test('O link para a página About funciona corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const rendersAbout = screen.getByRole('link', {
    name: 'About',
  });
  expect(rendersAbout).toBeInTheDocument();
  userEvent.click(rendersAbout);
});

test('O link para a página Favorite Pokemons funciona corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const rendersFavorites = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(rendersFavorites).toBeInTheDocument();
  userEvent.click(rendersFavorites);
});
