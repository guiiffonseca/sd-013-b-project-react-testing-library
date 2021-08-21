import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('', () => {
  const { history } = renderWithRouter(<App />);
  history.push('pokemons/25');
  expect(screen.getByRole('heading', { name: 'Pikachu Details', level: 2 }));
  const linkMoreDetails = screen.queryByText('More details');
  expect(linkMoreDetails).toBeNull();
  expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
    .toBeInTheDocument();
  expect(screen.getByText(/this intelligent/i)).toBeInTheDocument();

  expect(screen.getByText(/game locations of pik/i)).toBeInTheDocument();
  expect(screen.getAllByAltText('Pikachu location')[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
});
