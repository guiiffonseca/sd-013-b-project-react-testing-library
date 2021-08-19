import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../unit/renderWithRouter';
import pokemons from '../data';

describe('Requisito 5', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const buttonName = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  //   const pokemonTypes = [Eletric, Fire, Bug, Poison, Psych, Normal, Dragon];
  //   const typeBtnTestId = 'pokemon-type-button';

  test('Teste se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const heading2 = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Encountered pokémons') });
    expect(heading2).toBeInTheDocument();
  });

  test('O botão deve conter o texto "Próximo pokémon"', () => {
    const nextPokemonbutton = screen.getByRole('button', { name: buttonName });
    expect(nextPokemonbutton).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão'
  + '"Próximo pokémon" é clicado', () => {
    const firstPokemon = screen.getByTestId(pokemonName);
    const nextPokemonbutton = screen.getByRole('button', { name: buttonName });
    pokemons.forEach((_pokemon, index) => {
      if (index < pokemons.length - 1) {
        fireEvent.click(nextPokemonbutton);
        const thisPokemon = screen.getByTestId(pokemonName);
        expect(thisPokemon).toHaveTextContent(pokemons[index + 1].name);
      } else {
        fireEvent.click(nextPokemonbutton);
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      }
    });
  });
  test('', () => {
    
  });
});
