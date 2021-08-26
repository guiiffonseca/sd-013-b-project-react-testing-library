import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Testa se o component Pokédex renderiza.', () => {
  it('Se a página contem um Heading h2 com o texto Favorite Pokemons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[5], pokemons[3]] }
        isPokemonFavoriteById={ {} }
      />,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Se a página contem um botão com o texto Próximo pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[5], pokemons[3]] }
        isPokemonFavoriteById={ {} }
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
  });

  it('Se a página contem apenas um pokémon na tela', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[5], pokemons[3]] }
        isPokemonFavoriteById={ { 5: true, 3: true } }
      />,
    );

    const p = screen.getAllByText(/Average weight:/);
    expect(p.length).toBe(1);
  });

  it('Os próximos Pokémons da lista devem ser mostrados, ao clicar no botão', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[5], pokemons[3]] }
        isPokemonFavoriteById={ { 5: true, 3: true } }
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(button);
    const p = screen.getAllByText(/Average weight:/);
    expect(p.length).toBe(1);
  });

  it('Vê se contém todos os botões de filtro e se funcionam.', () => {
    renderWithRouter(<App />);

    const all = screen.getByText(/All/i);
    expect(all).toBeInTheDocument();
    userEvent.click(all);

    const Pikachu = screen.getByText('Pikachu');
    expect(Pikachu).toBeInTheDocument();

    const number = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(number);

    const Electric = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(Electric);

    // const Dragonair = screen.getByText('Dragonair');
    expect(Pikachu).toBeInTheDocument();

    const Psychic = screen.getByRole('button', {
      name: 'Psychic',
    });
    userEvent.click(Psychic);

    const Alakazam = screen.getByText('Alakazam');
    expect(Alakazam).toBeInTheDocument();
  });
});
