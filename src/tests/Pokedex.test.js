import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('"Pokédex" page testing', () => {
  const pokeName = 'pokemon-name';
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  it('contains "h2" with text "Encountered pokémons"', () => {
    // render(
    //   <MemoryRouter>
    //     <App />
    //   </MemoryRouter>,
    // );
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });
  it('shows next Pokémon if "Próximo pokémon" is clicked', () => {
    const psychicButton = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(psychicButton);
    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName).toHaveTextContent(/alakazam/i);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonButton);
    const nextPokemonName = screen.getByTestId(pokeName);
    expect(nextPokemonName).toHaveTextContent(/mew/i);
    userEvent.click(nextPokemonButton);
    const firstPokemonName = screen.getByTestId(pokeName);
    expect(firstPokemonName).toHaveTextContent(/alakazam/i);
  });
  it('renders only one pokémon at time', () => {
    const pokemonsList = screen.getAllByTestId(pokeName);
    expect(pokemonsList.length).toBe(1);
  });
  it('contains filter buttons', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0]).toHaveTextContent(/electric/i);
    expect(filterButtons[1]).toHaveTextContent(/fire/i);
    expect(filterButtons[2]).toHaveTextContent(/bug/i);
    expect(filterButtons[3]).toHaveTextContent(/poison/i);
    expect(filterButtons[4]).toHaveTextContent(/psychic/i);
    expect(filterButtons[5]).toHaveTextContent(/normal/i);
    expect(filterButtons[6]).toHaveTextContent(/dragon/i);
    const fireFilterButton = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireFilterButton);
    const firstPokemonType = screen.getByTestId('pokemon-type');
    expect(firstPokemonType).toHaveTextContent(/fire/i);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonButton);
    const secondPokemonType = screen.getByTestId('pokemon-type');
    expect(secondPokemonType).toHaveTextContent(/fire/i);
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(filterButtons[2]);
    expect(allButton).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    expect(allButton).toBeInTheDocument();
  });
  it('contains "All" filter button', () => {
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toHaveTextContent(/all/i);
    const defaultPokemonCard = screen.getByTestId(pokeName);
    expect(defaultPokemonCard).toHaveTextContent(/pikachu/i);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonButton);
    const secondDefaultPokemonCard = screen.getByTestId(pokeName);
    expect(secondDefaultPokemonCard).toHaveTextContent(/charmander/i);
    const fireButton = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireButton);
    userEvent.click(allButton);
    expect(defaultPokemonCard).toHaveTextContent(/pikachu/i);
    userEvent.click(nextPokemonButton);
    expect(secondDefaultPokemonCard).toHaveTextContent(/charmander/i);
  });
});
