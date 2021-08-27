import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const h2Text = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(h2Text).toBeInTheDocument();
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  test('se o botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const proximoPokemonButton = screen.getByTestId('next-pokemon');
    expect(proximoPokemonButton).toHaveTextContent(/Próximo pokémon/i);
  });

  test('se os próximos Pokémons da lista devem ser mostrados ao clicar no botão', () => {
    renderWithRouter(<App />);
    const proximoPokemonsButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    pokemons.forEach((pokemon, index) => {
      userEvent.click(proximoPokemonsButton);
      index += 1;
      if (index < pokemons.length) {
        const nextPokemonName = screen.getByText(pokemons[index].name);
        expect(nextPokemonName).toBeInTheDocument();
      }
    });
  });

  test('se o primeiro Pokémon aparece ao clicar no botão, estando no último', () => {
    renderWithRouter(<App />);
    const proximoPokemonsButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);
    userEvent.click(proximoPokemonsButton);

    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('se o texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const pokemonFilterButton = screen.getByRole('button', {
        name: type,
      });
      userEvent.click(pokemonFilterButton);
      const typeText = screen.getByTestId('pokemon-type');
      expect(typeText).toBeInTheDocument();
    });
  });

  test('se existe um botão de filtragem para cada tipo de Pokémon, sem repetir.', () => {
    renderWithRouter(<App />);
    const filtersNumbers = 7;
    pokemons.forEach(() => {
      const typeFilterButton = screen.getAllByTestId('pokemon-type-button');
      expect(typeFilterButton).toHaveLength(filtersNumbers);
    });
  });

  test('se os botões de filtro mostram corretamente os pokemons do tipo certo', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });

    userEvent.click(fireButton);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });

  test('se o botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('se o texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    const nextPokemon = screen.getByTestId('next-pokemon');

    userEvent.click(allButton);

    pokemons.forEach(({ name }) => {
      const pokemonNmae = screen.getByTestId('pokemon-name');
      expect(pokemonNmae).toHaveTextContent(name);

      userEvent.click(nextPokemon);
    });
  });
});
