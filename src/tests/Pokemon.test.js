import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

describe('testing pokemon', () => {
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
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'history of pikachu',
  };

  it('sould test the pokemon component', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');

    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const favImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const link = screen.getByRole('link', {
      name: 'More details',
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
  });
});
