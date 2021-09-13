import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testes do componente "PokemonDetails"', () => {
  test('testa se aparece o texto com o "pokemonName Details"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();
    const pokemonResumo = screen.getByText(/this intelligent Pokémon roasts hard/i);
    expect(pokemonResumo).toBeInTheDocument();
  });
  test('testa se existe uma secao c os mapas e as locations do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const gameLocations = screen.getByRole('heading', {
      name: /game Locations of/i,
      level: 2,
    });
    expect(gameLocations).toBeInTheDocument();
    const pokemonFirstLocationText = screen.getByText(/Kanto Viridian Forest/i);
    expect(pokemonFirstLocationText).toBeInTheDocument();
    const pikachuSecondLocation = screen.getByText(/Kanto Power Plant/i);
    expect(pikachuSecondLocation).toBeInTheDocument();
    const pikachuMaps = screen.getAllByAltText('Pikachu location');
    expect(pikachuMaps[0]).toHaveAttribute(
      'src',
      pokemons[0].foundAt[0].map,
    );
    expect(pikachuMaps[1]).toHaveAttribute(
      'src',
      pokemons[0].foundAt[1].map,
    );
    expect(pikachuMaps[0]).toHaveAttribute('alt', `${pokemons[0].name} location`);
    expect(pikachuMaps[1]).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
  test('testa se eh possivel favoritar o pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const favoritePokemonCheckbox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    expect(favoritePokemonCheckbox).toBeInTheDocument();
    const originalChecked = favoritePokemonCheckbox.checked;
    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox.checked).toBe(!originalChecked);
  });
});
