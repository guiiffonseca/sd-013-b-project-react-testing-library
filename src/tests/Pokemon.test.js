import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

const pokemonSelected = pokemons[0];
const pokemonSelectedWeight = pokemons[0].averageWeight;

describe('<Pokemon.js /> Integration Tests:', () => {
  test('1) Se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemonSelected }
        isFavorite={ false }
        isPokemonFavoriteById={ { 25: true } }
      />);

      const pokemonNameDisplay = screen.getByText(pokemonSelected.name);
      const pokemonTypeDisplay = screen.getByText(pokemonSelected.type);
      const pokemonWeightDisplay = screen.getByText(
        `Average weight: ${pokemonSelectedWeight.value}`
        + ` ${pokemonSelectedWeight.measurementUnit}`,
      );

      expect(pokemonNameDisplay).toBeInTheDocument();
      expect(pokemonTypeDisplay).toBeInTheDocument();
      expect(pokemonWeightDisplay).toBeInTheDocument();

      const pokemonImageSource = screen.getByRole('img');
      expect(pokemonImageSource).toHaveAttribute('src', pokemonSelected.image);

      const pokemonImageAlt = screen.getByAltText(`${pokemonSelected.name} sprite`);
      expect(pokemonImageAlt).toBeInTheDocument();
    });

  test('2) Se o card do Pokémon indicado na Pokédex contém um link de '
  + 'navegação para exibir detalhes deste Pokémon. O link deve possuir '
  + 'a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido.',
  () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonSelected }
      isFavorite={ false }
      isPokemonFavoriteById={ { 25: true } }
    />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemonSelected.id}`);
  });

  test('3) Se ao clicar no link de navegação do Pokémon, é feito o '
  + 'redirecionamento da aplicação para a página de detalhes de Pokémon.',
  () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const detailHeadingText = screen.getByRole('heading', {
      level: 2,
      name: `${pokemonSelected.name} Details`,
    });
    expect(detailHeadingText).toBeInTheDocument();
  });

  test('4) Se a URL exibida no navegador muda para "/pokemon/<id>", '
  + 'onde "<id>" é o id do Pokémon cujos detalhes se deseja ver.',
  () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${pokemonSelected.id}`);
  });

  test('5) Se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(detailsLink);

      const favoriteCheckbox = screen.getByRole('checkbox');
      userEvent.click(favoriteCheckbox);

      const favoriteStarImage = screen.getByAltText(
        `${pokemonSelected.name} is marked as favorite`,
      );
      expect(favoriteStarImage).toBeInTheDocument();
      expect(favoriteStarImage).toHaveAttribute('src', '/star-icon.svg');
    });
});
