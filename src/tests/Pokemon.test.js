import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('About the component Pokemon.js', () => {
  it('verifies if pokemon card is being rendered correctly', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImg.src).not.toBe('');
    expect(pokemonImg.alt).toBe(`${pokemonName.textContent} sprite`);
  });

  it('verifies if pokemon card has a details link', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('verifies if pokemon card has a star icon of favorite if favorited', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    fireEvent.click(detailsLink);
    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);
    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
