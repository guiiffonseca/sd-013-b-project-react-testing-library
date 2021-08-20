import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

test('Pokémon card', () => {
  renderWithRouter(<App />);
  expect(screen.getByTestId('pokemon-name')
    .innerHTML).toBe('Pikachu');
  expect(screen.getByTestId('pokemon-type')
    .innerHTML).toBe('Electric');
  expect(screen.getByTestId('pokemon-weight')
    .innerHTML).toBe('Average weight: 6.0 kg');
  expect(screen.getByAltText('Pikachu sprite').src)
    .toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
test('link de navegação', () => {
  const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
  const botDetal = screen.getByRole('link', {
    nome: /more details/i,
  });
  userEvent.click(botDetal);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
test('ícones de favoritos', () => {
  renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);
  const favStar = screen.getByAltText('Pikachu is marked as favorite');
  expect(favStar.src).toContain('/star-icon.svg');
  expect(favStar.alt).toBe('Pikachu is marked as favorite');
});
