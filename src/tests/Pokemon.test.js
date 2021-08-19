import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Pokemon.js tests', () => {
  test('The pokemon card with the informations is displayed in the screen ', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(/sprite/i);

    expect(pokemonName).not.toHaveTextContent('');
    expect(pokemonType).not.toHaveTextContent('');
    expect(pokemonWeight).toHaveTextContent(/weight/);
    expect(pokemonWeight).toHaveTextContent(/[0-9]/);
    expect(pokemonWeight).toHaveTextContent(/kg/);
    expect(pokemonImg.src).not.toBe('');
  });

  test('The pokemon card has a "More Details" link', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });

    // Referência para solução abaixo: https://stackoverflow.com/questions/67178886/react-testing-library-check-if-attribute-matches-regex
    expect(moreDetailsLink).toHaveAttribute('href', expect.stringMatching(/pokemons/));
  });

  test('There is a star icon in favorites Pokemons', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const starIcon = screen.getByAltText(/is marked as favorite/);

    expect(starIcon.src).not.toBe('');
    expect(starIcon.alt).not.toHaveAttribute('alt', 'is marked as favorite');
  });
});
