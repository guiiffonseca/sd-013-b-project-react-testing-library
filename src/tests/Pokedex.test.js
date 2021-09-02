import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../routes/router';
import pokemons from '../data';

import Pokedex from '../components/Pokedex';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('O título da seção Pokédex deve ser renderizado.', () => {
  test('A página contém um heading h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const rendersTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(rendersTitle).toBeInTheDocument();
  });
});

describe('A página contém um botão para renderizar o próximo pokémon.', () => {
  test('Um botão de trocar o pokémon é renderizado na base da página.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const rendersButton = screen.getByTestId('next-pokemon');
    expect(rendersButton).toBeInTheDocument();
  });

  test('O botão apresenta uma legenda "Próximo pokémon".', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const rendersButton = screen.getByTestId('next-pokemon');
    const renderedButtonText = rendersButton.innerHTML;
    expect(renderedButtonText).toBe('Próximo pokémon');
  });
});

const TYPE_AMOUNT = 7;

describe('A página contém vários botões para selecionar por tipo.', () => {
  test('Existe um botão para cada tipo de pokémon.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton[0]).toBeInTheDocument();
    expect(typeButton.length).toBe(TYPE_AMOUNT);
  });

  test('O botão deve filtrar a lista de pokémons disponíveis por tipo.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton[1].innerHTML).toBe('Fire');
    expect(typeButton[4].innerHTML).toBe('Psychic');
    expect(typeButton[6].innerHTML).toBe('Dragon');
  });

  test('O botão "All" torna todos os pokémons disponíveis novamente.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const allButton = screen.getByText('All');
    expect(allButton.innerHTML).toBe('All');
    userEvent.click(allButton);
  });
});
