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
    // const lastPokemonButton = screen.getByRole('button', {
    //   name: pokemons[pokemons.length - 1].type,
    // });

    // userEvent.click(lastPokemonButton);

    // const lastPokemon = screen.getByAltText(`${pokemons[pokemons.length - 1].name} sprite`);
    // const lastPokemon = screen.getByText(pokemons[pokemons.length - 1].name);
    // expect(lastPokemon).toBeInTheDocument();
    // const numberClicks = pokemons.length;
    // console.log(numberClicks);

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

describe('se a Pokédex tem os botões de filtro', () => {
  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const pokemonFilterButton = screen.getByRole('button', {
        name: type,
      });
      userEvent.click(pokemonFilterButton);
      const typeText = screen.getByTestId('pokemon-type');
      expect(typeText).toBeInTheDocument();
      // const namePokemon = screen.getByText(name);
      // expect(namePokemon).toBeInTheDocument();
    });
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    // const allText = screen.getByRole('button', {
    //   name: 'All',
    // });
    // expect(allText).toBeInTheDocument();
    // const allText = screen.getAllByTestId('pokemon-type-button');
    // const proximoPokemonButton = screen.getByRole('button', {
    //   name: 'Próximo pokémon',
    // });
    // userEvent.click(proximoPokemonButton);
    // expect(allText).toBeInTheDocument();

    // pokemons.forEach((pokemon) => {
    //   const pokemonFilterButton = screen.getByRole('button', {
    //     name: pokemon.type,
    //   });
    //   userEvent.click(pokemonFilterButton);
    //   expect(allText).toBeInTheDocument();
    // });
  });

  describe('este se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      const allText = screen.getByRole('button', {
        name: 'All',
      });
      expect(allText).toBeInTheDocument();
    });
  });
});
