import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testando Componente Pokemon', () => {
  it('testa se é renderizado um card com as infos de um pokemon', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const weight = pokemon.averageWeight.value;
      const unit = pokemon.averageWeight.measurementUnit;

      const getPokeName = screen.getByText(pokemon.name);
      expect(getPokeName).toBeInTheDocument();
      expect(getPokeName).toHaveTextContent(pokemon.name);

      const getType = screen.getByTestId('pokemon-type');
      expect(getType).toBeInTheDocument();
      expect(getType).toHaveTextContent(pokemon.type);

      const getWeight = screen.getByTestId('pokemon-weight');
      expect(getWeight).toBeInTheDocument();
      expect(getWeight).toHaveTextContent(`Average weight: ${weight} ${unit}`);

      const getImage = screen.getByRole('img', {
        name: `${pokemon.name} sprite`,
      });
      expect(getImage).toBeInTheDocument();
      expect(getImage).toHaveAttribute('src', `${pokemon.image}`);

      const nextButton = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      userEvent.click(nextButton);
    });
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    let numberOfClics = 1;
    pokemons.forEach((pokemon) => {
      const getLink = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(getLink).toBeInTheDocument();
      expect(getLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(getLink);

      const getNameInTheDetails = screen.getByRole('heading', {
        name: `${pokemon.name} Details`,
        level: 2,
      });
      expect(getNameInTheDetails).toBeInTheDocument();
      expect(getNameInTheDetails).toHaveTextContent(`${pokemon.name} Details`);

      const homeButton = screen.getByRole('link', {
        name: /home/i,
      });
      expect(homeButton).toBeInTheDocument();
      expect(homeButton).toHaveAttribute('href', '/');

      userEvent.click(homeButton);

      const nextButton = screen.getByTestId('next-pokemon');
      expect(nextButton).toBeInTheDocument();

      if (pokemons[0].name === pokemon.name) {
        userEvent.click(nextButton);
      } else {
        numberOfClics += 1;
        for (let index = 0; index < numberOfClics; index += 1) {
          userEvent.click(nextButton);
        }
      }
    });
  });

  it('testa se existe o icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
