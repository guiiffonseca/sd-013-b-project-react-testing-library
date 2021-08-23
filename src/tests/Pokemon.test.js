import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('Verify if the pokémon card rederized has the pokemons info', () => {
  renderWithRouter(<App />);

  const pokeName = screen.getByTestId('pokemon-name');
  expect(pokeName).toHaveTextContent('Pikachu');

  const pokeType = screen.getByTestId('pokemon-type');
  expect(pokeType).toHaveTextContent('Electric');

  const pokeWeigth = screen.getByTestId('pokemon-weight');
  expect(pokeWeigth).toHaveTextContent('Average weight: 6.0 kg');

  const pokeImg = screen.getByAltText('Pikachu sprite');
  expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Verify if the pokeCard has a link with details', () => {
  renderWithRouter(<App />);

  const pokeLink = screen.getByRole('link', {
    name: moreDetails,
  });
  expect(pokeLink).toHaveAttribute('href', '/pokemons/25');
});

test('Verify if when "More details" is clicked, the page redirect correctly', () => {
  const { history } = renderWithRouter(<App />);

  const pokeLink = screen.getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(pokeLink);
  const summaryText = screen.getByText(/Summary/i);
  expect(summaryText).toBeInTheDocument();
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Verify if the star icon appears in favorited pokemons', () => {
  renderWithRouter(<App />);

  const pokeLink = screen.getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(pokeLink);
  const checkFavorite = screen.getByRole('checkbox');
  userEvent.click(checkFavorite);

  const pokeCardFavorite = screen.getByAltText('Pikachu is marked as favorite');
  expect(pokeCardFavorite).toHaveAttribute('src', '/star-icon.svg');
});
