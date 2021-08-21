import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Pokémon card tests', () => {
  test('if the infos of the card its correct', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/sprite/i);

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('More details button link', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByRole('link', { name: /details/i });

    expect(button).toBeInTheDocument();
    expect(button.pathname).toBe('/pokemons/25');
    userEvent.click(button);
    const title = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(title).toBeInTheDocument();
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
  });

  test('If the favorite button exist', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByRole('link', { name: /details/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const checkbox = screen.getByLabelText(/favoritado/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const path = history.location.pathname;
    expect(path).toBe('/');
    const favorite = screen.getByAltText(/as favorite/i);
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(favorite.alt).toBe('Pikachu is marked as favorite');
  });
});
