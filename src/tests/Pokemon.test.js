import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('test of the component <Pokemon />', () => {
  test('should render one card with pokemon informations', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(electricButton);
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
    const textAverage = screen.getByText(/Average weight/i);
    expect(textAverage).toBeInTheDocument();
    const valueWeight = screen.getByText(/6.0/i);
    expect(valueWeight).toBeInTheDocument();
    const measurementUnit = screen.getByText(/Kg/i);
    expect(measurementUnit).toBeInTheDocument();
    const imagePokemon = screen.getByRole('img');
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Verify if contains link More Details and its functions', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(checkboxFavorite);
    const starFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
