import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './Utils/utils';

describe('Teste Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(
      <App />,
    );
    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemon.type);
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
        `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
      );
      expect(screen.getByRole('img')).toHaveAttribute('src', pokemon.image);
      expect(screen.getByRole('img')).toHaveAttribute('alt', `${pokemon.name} sprite`);
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });

  test('Teste se o card do Pokémon contem um link de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/,
      src: `/pokemons/${pokemons[0].id}`,
    });
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
