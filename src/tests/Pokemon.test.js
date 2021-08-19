import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Requirement 6 - Test the component <Pokemon />', () => {
  it('should the pokemon card contains the infos equal is rendered', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image,
    }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img');
      const moreInfoLink = screen.getByRole('link', { name: /More details/i });

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
      expect(moreInfoLink).toBeInTheDocument();
      expect(moreInfoLink).toHaveTextContent(/More details/i);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });

  it('should the more details link have text with pokemon id', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const { id } = pokemons[0];

    const moreInfoLink = screen.getByRole('link', { name: /More details/i });
    expect(moreInfoLink).toBeInTheDocument();

    userEvent.click(moreInfoLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('should exist a star icon in the favorite pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { name } = pokemons[0];

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
