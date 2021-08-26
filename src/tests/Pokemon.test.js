import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('É renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isPokemonFavoriteById={ { } } />);
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const image = screen.getByAltText('Pikachu sprite');

  expect(pokemonName.innerHTML).toBe('Pikachu');
  expect(pokemonType.innerHTML).toBe('Electric');
  expect(pokemonWeight.innerHTML).toContain('Average weight:');
  expect(pokemonWeight.innerHTML).toContain('kg');
  expect(pokemonWeight.innerHTML).toContain('6.0');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(image.alt).toBe('Pikachu sprite');
});

test('Card contém link de navegação', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isPokemonFavoriteById={ { } } />);
  const link = screen.getByText('More details');
  expect(link).toBeInTheDocument();
  expect(link.href).toContain('/pokemons/25');
});

test('Ao clicar no link, é feito o redirecionamento e a URL muda', () => {
  const {
    history,
  } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isPokemonFavoriteById={ { } } />);
  const link = screen.getByText('More details');
  const initialURL = history.location.pathname;
  fireEvent.click(link);
  const finalURL = history.location.pathname;
  expect(initialURL).not.toBe(finalURL);
});

test('Há um ícone de estrela nos pokemons favoritados', () => {
  const isFav = true;
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ isFav } />);
  const starIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(starIcon.src).toContain('/star-icon.svg');
});
