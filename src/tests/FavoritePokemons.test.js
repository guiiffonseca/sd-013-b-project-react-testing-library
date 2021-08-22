import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

// inspirado no código de Rafael Reis - Turma 13 - Tribo B
test('if it renders a message saying that there isn\'t favorite pokemons', () => {
  renderWithRouter(<App />);

  const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favorites);
  const message = screen.getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

test('if it renders favorite pokémons', () => {
  renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: 'More details' });
  userEvent.click(details);
  const checkbox = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(checkbox);
  const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favorites);
  const pikachuStarImg = screen.getByAltText('Pikachu is marked as favorite');
  expect(pikachuStarImg).toBeInTheDocument();
});
