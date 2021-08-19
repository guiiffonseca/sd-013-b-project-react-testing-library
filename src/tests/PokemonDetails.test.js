import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';
import pokemons from '../data';

const MORE_DETAILS = 'More details';

function forAllPokemon(index) {
  const linkHome = screen.getByText('Home');
  userEvent.click(linkHome);

  let numberOfClicks = 0;
  while (numberOfClicks <= index) {
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemonBtn);
    numberOfClicks += 1;
  }
}

describe('Testa o componente PokemonDetails.js', () => {
  test('se as informações detalhadas do Pokémon selecionado são '
    + 'mostradas na tela.', () => {
    RenderWithRouter(<App />);

    pokemons.forEach((pokemon, index) => {
      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const pokemonNameInDetails = screen
        .getByRole('heading', { level: 2, name: /details/i });
      const summaryTitle = screen
        .getByRole('heading', { level: 2, name: 'Summary' });
      const summaryText = screen.getByText(pokemon.summary);
      const linkMoreDetailsInDetails = screen
        .queryByRole('link', { name: MORE_DETAILS });

      expect(pokemonNameInDetails).toHaveTextContent(`${pokemon.name} Details`);
      expect(summaryTitle).toBeInTheDocument();
      expect(summaryText).toBeInTheDocument();
      expect(linkMoreDetailsInDetails).toBeNull();

      forAllPokemon(index);
    });
  });

  test('se existe na página uma seção com os mapas contendo as '
    + 'localizações do pokémon', () => {
    RenderWithRouter(<App />);

    pokemons.forEach((pokemon, index) => {
      const { name, foundAt } = pokemon;
      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const gameLocations = screen
        .getByRole('heading', { level: 2, name: /Game Locations/i });

      expect(gameLocations).toHaveTextContent(`Game Locations of ${name}`);

      foundAt.forEach((local, indexLocation) => {
        const maps = screen.getAllByRole('img', { name: /location/ });
        const location = screen.getByText(local.location);

        expect(maps[indexLocation]).toHaveAttribute('src', local.map);
        expect(maps[indexLocation]).toHaveAttribute('alt', `${name} location`);
        expect(location).toBeInTheDocument();
      });

      forAllPokemon(index);
    });
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    RenderWithRouter(<App />);

    pokemons.forEach((pokemon, index) => {
      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const checkbox = screen.getByLabelText('Pokémon favoritado?');

      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);
      const star = screen.queryByRole('img', { name: /marked as favorite/i });

      expect(star).toHaveAttribute('src', '/star-icon.svg');
      expect(star).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);

      userEvent.click(checkbox);
      const notStar = screen.queryByRole('img', { name: /marked as favorite/i });

      expect(notStar).toBeNull();

      forAllPokemon(index);
    });
  });
});
