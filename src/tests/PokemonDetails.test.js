import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonSelected = pokemons[0];
const MAX_DETAILS = 3;
const MAX_LOCATIONS = pokemonSelected.foundAt.length;

describe('<PokemonDetails.js /> Integration Tests:', () => {
  test('1) Se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const headingText = screen.getByRole('heading', {
        level: 2,
        name: `${pokemonSelected.name} Details`,
      });
      expect(headingText).toBeInTheDocument();

      const pokemonDetailsText = screen.getAllByTestId(/pokemon-/);
      expect(pokemonDetailsText).toHaveLength(MAX_DETAILS);
      expect(detailsLink).not.toBeInTheDocument();

      const summaryHeadingText = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(summaryHeadingText).toBeInTheDocument();

      const summaryContentText = screen.getByText(pokemonSelected.summary);
      expect(summaryContentText).toBeInTheDocument();
    });

  test('2) Se tem na página uma seção com os mapas contendo as localizações do pokémon.',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const gameHeadingText = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${pokemonSelected.name}`,
      });
      expect(gameHeadingText).toBeInTheDocument();

      const allPokemonLocations = screen.getAllByAltText(
        `${pokemonSelected.name} location`,
      );
      expect(allPokemonLocations).toHaveLength(MAX_LOCATIONS);

      pokemonSelected.foundAt.forEach((local, index) => {
        const nameLocation = screen.getByText(local.location);
        const allPokemonImages = screen.getAllByRole('img');
        expect(nameLocation).toBeInTheDocument();
        expect(allPokemonImages[index + 1]).toHaveAttribute('src', local.map);
      });
    });

  test('3) Se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const favoriteCheckbox = screen.getByRole('checkbox');
      expect(favoriteCheckbox).toBeInTheDocument();

      const favoriteCheckboxLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(favoriteCheckboxLabel).toBeInTheDocument();

      userEvent.click(favoriteCheckbox);
      const favoriteStarImage = screen.getByAltText(
        `${pokemonSelected.name} is marked as favorite`,
      );
      expect(favoriteStarImage).toBeInTheDocument();
      userEvent.click(favoriteCheckbox);
      expect(favoriteStarImage).not.toBeInTheDocument();
    });
});
