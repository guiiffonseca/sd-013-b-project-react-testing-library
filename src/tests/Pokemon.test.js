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
    const pokemonSprite = screen.getByAltText(/sprite/i);
    expect(pokemonSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Test if More details works proprerly', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(moreDetails);

    const moreDetailsPage = screen.getByText(/Summary/i);
    expect(moreDetailsPage).toBeInTheDocument();
  });

  it('Test if favorite icon appears on the screen', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(Checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toHaveAttribute('src', 'star-icon.svg');
  });
});
