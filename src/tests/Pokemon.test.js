import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { Pokemon } from '../components';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('Pokemon.js tests', () => {
  let history;
  beforeEach(() => {
    history = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    ).history;
  });

  it('should render a card with the information of a certain pokemon', () => {
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should have a navigation link to display details of this Pokemon', () => {
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toContain('/pokemons/25');
  });

  it('should redirect to Pokémon details page by clicking more details link', () => {
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should have a star icon in favorite Pokemons', () => {
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/star-icon.svg');
  });
});
