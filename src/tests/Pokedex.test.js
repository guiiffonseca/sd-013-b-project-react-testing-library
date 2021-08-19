import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import App from '../App';

describe('Testa Pokedex', () => {
  const pokemonTypeId = 'pokemon-type-button';
  const pokeNameId = 'pokemon-name';
  test('Testa se existe 1 pokemon na tela apenas', () => {
    RenderWithRouter(<App />);
    const pokemons = screen.getAllByTestId(pokeNameId);

    expect(pokemons).toHaveLength(1);
  });

  test('Testando botão proximo pokemon existe', () => {
    RenderWithRouter(<App />);
    const nextPokemonButton = screen.getByText('Próximo pokémon');
    expect(nextPokemonButton).toBeInTheDocument();
  });

  test('Testa funcionalidade botão proximo pokemon', () => {
    RenderWithRouter(<App />);
    const nextPokemonButton = screen.getByText('Próximo pokémon');
    const pokeCard = screen.getByTestId(pokeNameId);

    fireEvent.click(nextPokemonButton);
    expect(pokeCard).toHaveTextContent('Charmander');
  });

  test('Testa se existe botoes de filtro', () => {
    RenderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(pokemonTypeId);
    const FILTER_BUTTONS_NUMBER = 7;
    expect(filterButtons).toHaveLength(FILTER_BUTTONS_NUMBER);
  });

  test('Testa se os botoes tem o texto certo', () => {
    RenderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(pokemonTypeId);

    expect(filterButtons[0]).toHaveTextContent('Electric');
  });

  test('Testa existencia do botão All', () => {
    RenderWithRouter(<App />);
    const allButton = screen.getByText('All');

    expect(allButton).toBeInTheDocument();
  });

  test('Testa funcionalidade botao All', () => {
    RenderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByText('All');
    const pokemonName = screen.getByTestId('pokemon-name');

    fireEvent.click(filterButtons[5]);
    expect(pokemonName).toHaveTextContent('Snorlax');

    fireEvent.click(allButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
