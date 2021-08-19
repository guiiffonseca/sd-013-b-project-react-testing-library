import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    RenderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { name, type, averageWeight, image } = pokemon;
      const { value, measurementUnit } = averageWeight;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImg = screen.getByRole('img');

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonImg).toHaveAttribute('src', image);
      expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);

      const nextPokemonBtn = screen.getByTestId('next-pokemon');
      userEvent.click(nextPokemonBtn);
    });
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de '
    + 'navegação para exibir detalhes deste Pokémon. O link deve possuir '
    + 'a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;', () => {
    const { history } = RenderWithRouter(<App />);

    pokemons.forEach((pokemon, index) => {
      const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
      userEvent.click(linkMoreDetails);

      const pokemonNameInDetails = screen.getByRole('heading', {
        level: 2,
        name: /details/i,
      });
      const { pathname } = history.location;
      expect(pokemonNameInDetails).toHaveTextContent(`${pokemon.name} Details`);
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const linkHome = screen.getByText('Home');
      userEvent.click(linkHome);

      let numberOfClicks = 0;
      while (numberOfClicks <= index) {
        const nextPokemonBtn = screen.getByTestId('next-pokemon');
        userEvent.click(nextPokemonBtn);
        numberOfClicks += 1;
      }
    });
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    RenderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const star = screen.getByRole('img', { name: /marked as favorite/i });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
