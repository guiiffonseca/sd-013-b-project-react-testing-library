import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import App from '../App';

describe('Requisito Pokemon test', () => {
  test('Verifique se renderiza um card com informações de determinado Pokémon', () => {
    RouterMemory(<App />);

    expect(screen.getByTestId('pokemon-name')
      .innerHTML).toBe('Pikachu');

    expect(screen.getByTestId('pokemon-type')
      .innerHTML).toBe('Electric');

    expect(screen.getByTestId('pokemon-weight')
      .innerHTML).toBe('Average weight: 6.0 kg');

    expect(screen.getByAltText('Pikachu sprite').src)
      .toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifique se possui umlink de navegação', () => {
    const { history } = RouterMemory(<App />);

    const detailLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(detailLink);

    const localhost = history.location.pathname;
    expect(localhost).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
