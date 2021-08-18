import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../utils/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Requisito 7', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  };

  const isFavorite = false;

  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', {
      src: pokemon.image,
      alt: `${pokemon.name} sprite`,
    });

    expect(pokemonName).toContainHTML('Pikachu');
    expect(pokemonType).toContainHTML('Electric');
    expect(pokemonWeight).toContainHTML('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });
  it('O card contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFavorite } />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
      href: `http://localhost/pokemons/${pokemon.id}`,
    });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it('Ao clicar no link de detalhes, redireciona a página e a URL muda', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
      href: `http://localhost/pokemons/${pokemon.id}`,
    });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toBe('http://localhost/pokemons/25');

    userEvent.click(moreDetailsLink);
    const pokemonDetailLinks = history.location.pathname;

    expect(pokemonDetailLinks).toBe('/pokemons/25');
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ !isFavorite }
    />);

    const starImage = screen.getByAltText(`${pokemon.name} is marked as favorite`);

    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
    expect(starImage.alt).toBe('Pikachu is marked as favorite');
  });
});
