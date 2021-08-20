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
});
