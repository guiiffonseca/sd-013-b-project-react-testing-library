import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const NEXT_POKEMON = 'Próximo pokémon';

describe('<Pokedex.js /> Integration Tests:', () => {
  test('1) Se página contém um heading "h2" com o texto "Encountered pokémons".',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true } }
      />);

      const headingText = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(headingText).toBeInTheDocument();
    });

  test('2) Se é exibido o próximo Pokémon da lista quando'
  + ' o botão "Próximo pokémon" é clicado.',
  () => {
    renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[4], pokemons[5]] }
      isPokemonFavoriteById={ { 25: true, 65: true, 151: true } }
    />);

    const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const firstPokemonNameText = screen.getByText('Alakazam');
    expect(firstPokemonNameText).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const secondPokemonNameText = screen.getByText('Mew');
    expect(secondPokemonNameText).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const thirdPokemonNameText = screen.getByText('Pikachu');
    expect(thirdPokemonNameText).toBeInTheDocument();
  });

  test('3) Se é mostrado apenas um Pokémon por vez.',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true } }
      />);

      const showPokemonsOnScreen = screen.getAllByTestId('pokemon-name');

      expect(showPokemonsOnScreen).toHaveLength(1);
    });

  test('4) Se a Pokédex tem os botões de filtro.',
    () => {
      const MAX_TYPES = 7;
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 65: true, 151: true } }
      />);

      const allFilterButton = screen.getByRole('button', { name: 'All' });
      const electricFilterButton = screen.getByRole('button', { name: 'Electric' });
      const fireFilterButton = screen.getByRole('button', { name: 'Fire' });
      const bugFilterButton = screen.getByRole('button', { name: 'Bug' });
      const poisonFilterButton = screen.getByRole('button', { name: 'Poison' });
      const psychicFilterButton = screen.getByRole('button', { name: 'Psychic' });
      const normalFilterButton = screen.getByRole('button', { name: 'Normal' });
      const dragonFilterButton = screen.getByRole('button', { name: 'Dragon' });

      expect(allFilterButton).toBeInTheDocument();
      expect(electricFilterButton).toBeInTheDocument();
      expect(fireFilterButton).toBeInTheDocument();
      expect(bugFilterButton).toBeInTheDocument();
      expect(poisonFilterButton).toBeInTheDocument();
      expect(psychicFilterButton).toBeInTheDocument();
      expect(normalFilterButton).toBeInTheDocument();
      expect(dragonFilterButton).toBeInTheDocument();

      const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(pokemonTypeButtons).toHaveLength(MAX_TYPES);

      userEvent.click(psychicFilterButton);
      const firstPokemonFilteredText = screen.getByText('Alakazam');
      expect(firstPokemonFilteredText).toBeInTheDocument();

      const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(nextPokemonButton);
      const secondPokemonFilteredText = screen.getByText('Mew');
      expect(secondPokemonFilteredText).toBeInTheDocument();
    });

  test('5) Se a Pokédex contém um botão para resetar o filtro.',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ [pokemons[0], pokemons[4], pokemons[5]] }
        isPokemonFavoriteById={ { 25: true, 65: true, 151: true } }
      />);

      const allFilterButton = screen.getByRole('button', { name: 'All' });
      userEvent.click(allFilterButton);
      const firstPokemonFilteredText = screen.getByText('Pikachu');
      expect(firstPokemonFilteredText).toBeInTheDocument();

      const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(nextPokemonButton);
      const secondPokemonFilteredText = screen.getByText('Alakazam');
      expect(secondPokemonFilteredText).toBeInTheDocument();
    });
});
