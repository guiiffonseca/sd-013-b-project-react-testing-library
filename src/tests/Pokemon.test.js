import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
};

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkMoreDetails.href).toContain(`pokemons/${pokemon.id}`);
  userEvent.click(linkMoreDetails);
  expect(screen.getByText('Summary'));
  userEvent.click(screen.getByRole('checkbox', { checked: false }));
  expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
  expect(imgFavorite.src).toContain('/star-icon.svg');
});

test('', () => {
  renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Electric')).toBeInTheDocument();
  expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
  expect(screen.getByRole('img').src).toContain(pokemon.image);
  expect(screen.getByRole('img').alt).toContain(`${pokemon.name} sprite`);
});
