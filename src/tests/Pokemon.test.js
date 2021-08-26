import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Text implementation Pokemon', () => {
  test('test card Pokemon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  test('Text Pokemon details', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favorite);
    expect(favorite).toBeChecked();
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon.src).toContain('star-icon.svg');
  });
});
