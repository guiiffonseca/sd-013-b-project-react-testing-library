import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

import App from '../App';

describe('if component Pokemon.js is working properly', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('should display the correct info of the Pokémon on the screen', () => {
    const pikachu = pokemons[0];
    const { value, measurementUnit } = pikachu.averageWeight;
    const { name, type } = pikachu;

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
      .toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
  it('should have a star icon on favorited pokemons', () => {
    const electricButton = screen.getByRole('button',
      { name: 'Electric',
      });

    userEvent.click(electricButton);
    const details = screen.getByRole('link',
      { name: 'More details',
      });

    userEvent.click(details);
    const favoritedPokemon = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?',
      });

    userEvent.click(favoritedPokemon);
    const pokeImage = screen.getAllByRole('img');
    expect(pokeImage[1].alt).toContain('Pikachu is marked as favorite');
    expect(pokeImage[1].src).toContain('star-icon.svg');
  });
});
