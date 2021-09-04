import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';
import pokemons from '../data';

import Pokemon from '../components/Pokemon';
import Pokedex from '../components/Pokedex';
import App from '../App';

const isPokemonFavoriteById = App.setIsPokemonFavoriteById();

describe('É renderizado um card com as informações de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite={ isPokemonFavoriteById[pokemons[3].id] }
    />);
    const renderedPokemon = screen.getByTestId('pokemon-name', {
      name: /ekans/i,
    });
    expect(renderedPokemon).toBeInTheDocument();
    expect(renderedPokemon.innerHTML).toBe('Ekans');
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite={ isPokemonFavoriteById[pokemons[3].id] }
    />);
    const renderedType = screen.getByTestId('pokemon-type', {
      type: /poison/i,
    });
    expect(renderedType).toBeInTheDocument();
    expect(renderedType.innerHTML).toBe('Poison');
  });

  test('O peso médio do pokémon deve ser exibido.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite={ isPokemonFavoriteById[pokemons[3].id] }
    />);
    const renderedWeight = screen.getByTestId('pokemon-weight');
    const { value: weight, measurementUnit: unit } = pokemons[3].averageWeight;
    expect(renderedWeight).toBeInTheDocument();
    expect(weight).toBe('6.9');
    expect(unit).toBe('kg');
    expect(renderedWeight.innerHTML).toBe(`Average weight: ${weight} ${unit}`);
  });

  test('A imagem do Pokémon deve ser exibida na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite={ isPokemonFavoriteById[pokemons[3].id] }
    />);
    const renderedImage = screen.getByRole('img');
    expect(renderedImage).toBeInTheDocument();
    expect(renderedImage.alt).toBe('Ekans sprite');
    expect(renderedImage.src).toBe('https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
  });
});

describe('O card do Pokémon indicado na Pokédex contém um link para detalhes.', () => {
  test('O link deve possuir a URL /pokemons/<id>.', () => {
    /* const { history } = renderWithRouter(<Pokemon
      pokemon={pokemons[3]}
      isFavorite={isPokemonFavoriteById[pokemons[3].id]}
    />);
    history.push('/pokemons/23'); */
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
    const poisonButton = screen.getAllByRole('button', {
      key: /poison/i,
    })[4];
    const detailsLink = screen.getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.pathname).toBe('/pokemons/25');
    userEvent.click(poisonButton);
    expect(detailsLink.pathname).toBe('/pokemons/23');
  });
});

describe('Existe um ícone de estrela nos pokémons favoritados.', () => {
  test('O ícone aparece na tela quando o pokémon é favorito.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite
    />);
    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon).toBeInTheDocument();
  });

  const description1 = 'A imagem deve ter o atributo alt';
  const description2 = 'igual a <pokemon> is marked as favorite.';

  test(`${description1} ${description2}`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite
    />);
    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon.alt).toBe('Ekans is marked as favorite');
  });

  const description3 = 'O ícone deve ser uma imagem com o atributo';
  const description4 = '"src" contendo o caminho /star-icon.svg';

  test(`${description3} ${description4}`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite
    />);
    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
