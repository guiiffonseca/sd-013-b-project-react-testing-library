import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('Pokemon.JS Tests', () => {
  let history;

  const {
    id,
    name,
    type,
    averageWeight: {
      measurementUnit: AvWeightUnit,
      value: AvWeightValue,
    },
    image: imgURL,
  } = pokemons[0];

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemonElements = {
      name: screen.getByTestId('pokemon-name'),
      type: screen.getByTestId('pokemon-type'),
      averageWeight: screen.getByTestId('pokemon-weight'),
      image: screen.getByAltText(`${name} sprite`),
    };

    Object.keys(pokemonElements).forEach((key) => {
      expect(pokemonElements[key]).toBeInTheDocument();
    });

    expect(pokemonElements.name.innerHTML).toMatch(name);
    expect(pokemonElements.type.innerHTML).toMatch(type);
    expect(pokemonElements.averageWeight.innerHTML)
      .toMatch(`Average weight: ${AvWeightValue} ${AvWeightUnit}`);
    expect(pokemonElements.image.src).toMatch(imgURL);
  });

  test('Teste se o card do Pokémon contém um link para exibir mais detalhes.', () => {
    const moreDetails = screen.getByText('More details');

    expect(moreDetails).toHaveAttribute('href');
    expect(moreDetails.href).toMatch(new RegExp(`/pokemons/${id}`, 'i'));
  });

  test('Ao clicar redireciona para a tela de detalhes.', () => {
    const moreDetails = screen.getByText('More details');

    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Ao clicar redireciona para a tela de detalhes.', () => {
    history.push(`/pokemons/${id}`);
    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    history.push('/');

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toMatch(/\/star-icon.svg/);
  });
});
