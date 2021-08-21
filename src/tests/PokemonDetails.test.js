import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonDetails } from '../components';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testes do componente PokemonDetails', () => {
  const pikachu = pokemons[0];
  const match = {
    params: { id: pikachu.id },
  };
  beforeEach(() => {
    render(
      <PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ pokemons }
      />,
    );
  });
  it('Render PokeDetails and test components', () => {
    const name = screen.getByTestId('pokemon-name');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: `${pikachu.name} Details`,
    });
    const detailsBtn = screen.queryByText('More details');
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokeDetails = screen.getByText(pikachu.summary);
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe(pikachu.name);
    expect(detailsBtn).toBeNull();
    expect(summary).toBeInTheDocument();
    expect(pokeDetails.innerHTML).toBe(pikachu.summary);
    expect(heading).toBeInTheDocument();
  });
  it('Check pokemon location', () => {
    const summary = screen.getByRole('heading', {
      name: `Game Locations of ${pikachu.name}`,
    });
    pikachu.foundAt.forEach((local, index) => {
      const text = screen.getByText(local.location);
      const map = screen.getAllByRole('img', {
        name: `${pikachu.name} location`,
      });
      expect(text.innerHTML).toBe(local.location);
      expect(map[index].src).toBe(local.map);
      expect(map[index].alt).toBe(`${pikachu.name} location`);
      expect(summary).toBeInTheDocument();
    });
  });
});
describe('Testes do botão Fav', () => {
  it('Check favorite button', () => {
    renderWithRouter(
      <App />,
    );
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    const favbtn = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favbtn);
    const star = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(star).toBeInTheDocument();
  });
});
