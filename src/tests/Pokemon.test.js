import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste se é renderizado um card com as info de determinado pokémon', () => {
  test('se as informações de cada pokémon é exibida', () => {
    renderWithRouter(<App />);
    pokemons
      .forEach(({ name, type, image, averageWeight: { value, measurementUnit } }) => {
        const nextPokemonButton = screen.getByRole('button', {
          name: 'Próximo pokémon',
        });
        const pokemonName = screen.getByText(name);
        const pokemonType = screen.getByTestId('pokemon-type');
        const pokemonWeight = screen
          .getByText(`Average weight: ${value} ${measurementUnit}`);
        const pokemonImage = screen.getByAltText(`${name} sprite`);

        expect(pokemonName).toBeInTheDocument();
        expect(pokemonType).toHaveTextContent(type);
        expect(pokemonWeight).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute('src', image);

        userEvent.click(nextPokemonButton);
      });
  });
});

test('se o card do Pokémon indicado na Pokédex tem um link de navegação detalhes', () => {
  const { history } = renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(moreDetailsLink);

  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('se o ícone deve ser uma img com o att src com caminho correto', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach(({ id, name }) => {
      history.push(`/pokemons/${id}`);
      const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i, {
        selector: 'input',
      });

      userEvent.click(favoritePokemon);

      const iconeFavoritos = screen.getByAltText(`${name} is marked as favorite`);

      expect(iconeFavoritos).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
