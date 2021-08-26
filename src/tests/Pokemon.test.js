import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test 6- Pokemon page', () => {
  it('Test pokemon card', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(/sprite/i);

    expect(pokemonName).not.toHaveTextContent('');
    expect(pokemonType).not.toHaveTextContent('');
    expect(pokemonWeight).toHaveTextContent(/weight/);
    expect(pokemonWeight).toHaveTextContent(/[0-9]/);
    expect(pokemonWeight).toHaveTextContent(/kg/);
    expect(pokemonImg.src).not.toBe('');
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
    expect(favoritePokemon).toHaveAttribute('src', 'star-icon.svg');
  });
});
