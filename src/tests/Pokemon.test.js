import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const mockPokemon = pokemons[8];

describe('6. Testa o componente `<Pokemon.js />`', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = mockPokemon.averageWeight;
    const pokemonImage = screen.getByAltText(`${mockPokemon.name} sprite`);
    const detailsLink = screen.getByText(/more details/i);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    expect(pokemonName).toHaveTextContent(mockPokemon.name);
    expect(pokemonType).toHaveTextContent(mockPokemon.type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toBe(imageURL);
    expect(detailsLink).toBeInTheDocument();
  });

  it('Testa se o card do Pokémon contém um link para exibir detalhes.', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const detailsLink = screen.getByText(/more details/i);

    expect(history.location.pathname).toBe('/');
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${mockPokemon.id}`);
  });

  it('Testa se o clique no link de navegação redireciona pra página de detalhes', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite
      />,
    );

    const starImage = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);

    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toBe('http://localhost/star-icon.svg'); // 100% mutants;
  });
});
