import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test 6- Pokemon page', () => {
  it('Test pokemon card', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toContain('Average weight: 6.0 kg');
    const pokemonSprite = screen.getByAltText('Pikachu sprite');
    expect(pokemonSprite.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Test if More details id works proprerly', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);

    const moreDetailsPage = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(moreDetailsPage).toBeInTheDocument();
  });

  it('Test if favorite icon appears on the screen', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon.src).toContain('star-icon.svg');
  });
});
