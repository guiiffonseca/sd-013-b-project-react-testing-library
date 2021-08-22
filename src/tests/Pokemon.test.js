import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

describe('Testando o componente Pokemon.js', () => {
  test('Teste se é renderizado o card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image,
    }) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      const typePokemon = screen.getByTestId('pokemon-type');
      const weightValuePokemon = screen.getByTestId('pokemon-weight');
      const imgPokemon = screen.getByRole('img');
      const moreInfPokemon = screen.getByRole('link', { name: /More details/i });

      expect(namePokemon).toBeInTheDocument();
      expect(namePokemon).toHaveTextContent(name);

      expect(typePokemon).toBeInTheDocument();
      expect(typePokemon).toHaveTextContent(type);

      expect(weightValuePokemon).toBeInTheDocument();
      expect(weightValuePokemon).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

      expect(imgPokemon).toBeInTheDocument();
      expect(imgPokemon.src).toStrictEqual(image);
      expect(imgPokemon.alt).toStrictEqual(`${name} sprite`);

      expect(moreInfPokemon).toBeInTheDocument();
      expect(moreInfPokemon).toHaveTextContent(/More details/i);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });

  test('Teste se o link "More details" indica para outra url', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const moreInfo = screen.getByRole('link', { name: /More details/i });
    expect(moreInfo).toBeInTheDocument();

    userEvent.click(moreInfo);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const icon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
