import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

test('Primeiro link deve possuir o texto home', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

test('Segundo link deve possuir o texto about', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});

test('Terceiro link deve possuir o texto Favorite Pokémons', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText('Favorite Pokémons');
  expect(linkElement).toBeInTheDocument();
});
