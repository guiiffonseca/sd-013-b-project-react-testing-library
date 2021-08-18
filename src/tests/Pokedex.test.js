import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const pokemonListRunner = () => {
  pokemons.forEach((pokemon, index, array) => {
    const button = screen.getByTestId('next-pokemon');
    const actualPokemonName = screen.getByText(pokemon.name);
    expect(actualPokemonName).toBeInTheDocument();
    expect(actualPokemonName.textContent).toBe(pokemon.name);
    const pokemonImage = screen.getAllByRole('img');
    expect(pokemonImage.length).toBe(1);
    expect(pokemonImage[0].alt).toBe(`${pokemon.name} sprite`);
    fireEvent.click(button);
    if (index === array.length - 1) {
      const firstPokemon = screen.getByText('Pikachu');
      expect(firstPokemon).toBeInTheDocument();
    }
  });
};

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    const headingEnconteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(headingEnconteredPokemons).toBeInTheDocument();
  });
  describe('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
      const button = screen.getByTestId('next-pokemon');
      expect(button.textContent).toBe('Próximo pokémon');
    });
    const testLabel1 = 'Pokémons devem ser mostrados ao clicar sucessivamente no botão'
     + ', ao ser o ultimo pokémon, retornar ao primeiro e só existir um por vez';
    test(testLabel1, () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
      pokemonListRunner();
    });
    describe('Teste se a Pokédex tem os botões de filtro.', () => {
      const testLabel2 = 'Deve existir um botão de filtragem para'
      + 'cada tipo de Pokémon, sem repetição. ';
      test(testLabel2, () => {
        renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
        const pokemonTypeButtons = ['All', 'Electric', 'Fire', 'Bug', 'Poison',
          'Psychic', 'Normal', 'Dragon'];
        pokemonTypeButtons.forEach((button) => {
          const actualButton = screen.getByRole('button', { name: button });
          expect(actualButton).toBeInTheDocument();
        });
      });
      const labelTest3 = 'O texto do botão deve corresponder '
      + 'ao nome do tipo e o All está sempre visivel';
      test(labelTest3, () => {
        renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
        const pokemonTypeButtons = ['Electric', 'Fire', 'Bug', 'Poison',
          'Psychic', 'Normal', 'Dragon'];
        pokemonTypeButtons.forEach((button) => {
          const actualButton = screen.getByRole('button', { name: button });
          const allButton = screen.getByText('All');
          fireEvent.click(actualButton);
          const actualPokemonType = screen.getByTestId('pokemon-type');
          expect(actualPokemonType).toBeInTheDocument();
          expect(actualPokemonType.textContent).toBe(button);
          expect(allButton).toBeInTheDocument();
        });
      });
    });
    describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
      test('O texto do botão deve ser All', () => {
        renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
        const allButton = screen.getByText('All');
        expect(allButton).toBeInTheDocument();
        fireEvent.click(allButton);
        pokemonListRunner();
      });
    });
  });
});
