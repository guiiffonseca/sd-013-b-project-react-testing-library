import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../routes/router';

import FavoritePokemons from '../components/FavoritePokemons';

test('O título da seção é renderizado com o texto "Favorite pokémons".', () => {
  const { history } = renderWithRouter(<FavoritePokemons />);
  history.push('/favorites');
  const rendersFavorites = screen.getByRole('heading', {
    level: 2,
    name: /favorite pokémons/i,
  });
  expect(rendersFavorites).toBeInTheDocument();
});

test('O texto "No favorite pokemon found" quando não há pokemon favorito.', () => {
  const { history } = renderWithRouter(<FavoritePokemons />);
  history.push('/favorites');
  const notFound = screen.getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});
