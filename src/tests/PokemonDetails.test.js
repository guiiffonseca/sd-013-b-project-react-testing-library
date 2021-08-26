import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(componentRender) {
  const historye = createMemoryHistory();
  return {
    ...render(
      <Router history={ historye }>
        {componentRender}
      </Router>,
    ),
    history: historye,
  };
}

describe('Test PokemonDetails', () => {
  it('pokemons details', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);
    const componentDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Detail/i,
    });
    expect(componentDetails).toBeInTheDocument();
  });

  it('pokemon mapi', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);
    const imgem = screen.getAllByRole('img', { name: /Pikachu location/i })[0];
    expect(imgem.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgem.alt).toBe('Pikachu location');
    const location = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations/i,
    });
    expect(location).toBeInTheDocument();

    const locationGame = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(locationGame).toBeInTheDocument();
    const sumary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(sumary).toBeInTheDocument();
    const sumaryP = screen.getByText(/This intelligent Pokémon/i);
    expect(sumaryP).toBeInTheDocument();
  });

  it('favorite pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
  });
});
