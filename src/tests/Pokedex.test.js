import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const homePageText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(homePageText).toBeInTheDocument();

    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(nextPokemonButton.textContent).toBe('Próximo pokémon');

    const pokemons = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    for (let index = 0; index < pokemons.length; index += 1) {
      const actualPokemon = screen.getByTestId('pokemon-name');
      expect(actualPokemon.textContent).toBe(pokemons[index]);
      userEvent.click(nextPokemonButton);
    }
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allTypesNumberLength = 7;
    const getAllTypes = screen.getAllByTestId('pokemon-type-button');
    expect(getAllTypes).toHaveLength(allTypesNumberLength);
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const getAllPokemons = screen.getByRole('button', {
      name: 'All',
    });
    expect(getAllPokemons).toBeInTheDocument();

    userEvent.click(getAllPokemons);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
  });
});
