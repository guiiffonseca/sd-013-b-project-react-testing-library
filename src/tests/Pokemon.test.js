import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Testa se o component Pokédex contem informações sobre a Pokédex.', () => {
  it('As informações dos Pokémons devem ser mostrado na tela', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[5], pokemons[3]] }
        isPokemonFavoriteById={ {} }
      />,
    );

    const p = screen.getByText(/Mew/i);
    expect(p).toBeInTheDocument();

    const p1 = screen.getByTestId('pokemon-type');
    expect(p1.textContent).toBe('Psychic');

    const p2 = screen.getByText(/Average weight: 4.0 kg/i);
    expect(p2).toBeInTheDocument();

    const url = 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png';
    const img = screen.getByAltText(/Mew sprite/i);
    expect(img).toHaveAttribute('src', url);
  });

  it('Se a página contem um link para informações do pokémon', () => {
    renderWithRouter(
      <App />,
    );

    const link = screen.getByText('More details');
    expect(link).toHaveAttribute('href', '/pokemons/25');
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const heading = screen.getByText(/Summary/i);
    expect(heading).toBeInTheDocument();
  });
});
