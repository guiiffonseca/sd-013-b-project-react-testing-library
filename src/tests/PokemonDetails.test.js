import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Component PokemonDetails tests', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('should show details of the pokemon when the link is accessed', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
    const pokemonName = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pokemonName).toBeInTheDocument();
    const detailsHeading = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(detailsHeading).toBeInTheDocument();
    const pokemonSummary = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('should have a section with all the pokemon location', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const locationHeading = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(locationHeading).toBeInTheDocument();
    const locationsImage = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locationsImage.length).toBeGreaterThan(1);
    expect(locationsImage[0]).toBeInTheDocument();
    expect(locationsImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsImage[0].alt).toBe('Pikachu location');
  });

  it('should have a favorite checkbox that changes this status on every click', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
    expect(favorite.checked).toBeFalsy();
    userEvent.click(favorite);
    expect(favorite.checked).toBeTruthy();
    userEvent.click(favorite);
    expect(favorite.checked).toBeFalsy();
  });
});
