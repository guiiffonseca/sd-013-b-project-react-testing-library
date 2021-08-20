import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testes do componente Pokemon', () => {
  const pikachu = pokemons[0];

  it('Pokemon card test', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ pikachu } isFavorite />
      </MemoryRouter>,
    );
    const name = screen.getByTestId('pokemon-name').innerHTML;
    const type = screen.getByTestId('pokemon-type').innerHTML;
    const weight = screen.getByTestId('pokemon-weight').innerHTML;
    const img = screen.getByRole('img', {
      name: `${pikachu.name} sprite`,
    });
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    const favorite = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
    expect(weight).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pikachu.id}`);
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });
});
