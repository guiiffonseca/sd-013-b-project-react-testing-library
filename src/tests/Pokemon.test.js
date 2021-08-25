import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Pokemon.js tests', () => {
  const details = 'More details';
  test('Has info in pokemon card ', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/sprite/i);
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Card has link to Details page', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: details });
    expect(detailsLink).toHaveAttribute('href');
  });
  test('Go to Details page by clicking in "More details"', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText(details);
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('If favorited pokemon has star', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: details });
    userEvent.click(detailsLink);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
