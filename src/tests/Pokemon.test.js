import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing cases of Pokemon component', () => {
  test('render a pokemon card on screen', () => {
    const { history } = renderWithRouter(<App />);
    const { value, measurementUnit } = pokemons[0].averageWeight;
    const averageWeight = `Average weight: ${value} ${measurementUnit}`;
    const { type } = pokemons[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(averageWeight);
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('have a image off present pokemon', () => {
    renderWithRouter(<App />);
    const sprite = `${pokemons[0].name} sprite`;
    const { image } = pokemons[0];
    const pokemonImage = screen.getByAltText(sprite);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('alt', sprite);
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  test('shows star of favorite on card when is as selected', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const isFavorite = screen.getByRole('checkbox');
    userEvent.click(isFavorite);
    const pokemonFavorite = `${pokemons[0].name} is marked as favorite`;
    const favoriteIcon = screen.getByAltText(pokemonFavorite);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
