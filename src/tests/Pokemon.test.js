import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('testes do componente Pokemon', () => {
  test('testa se renderiza um card c infos de um pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pikachuName = screen.getByText(pokemons[0].name);
    expect(pikachuName).toBeInTheDocument();
    const pikachuType = screen.getAllByText(pokemons[0].type);
    expect(pikachuType[0]).toBeInTheDocument();
    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();
    const pikachuImage = screen.getAllByRole('img');
    expect(pikachuImage[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pikachuImage[0]).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
    pokemons.forEach(({ type, name, averageWeight, image }) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
      expect(screen.getByRole('img')).toHaveAttribute('src', image);
      expect(screen.getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
      const nextButton = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      userEvent.click(nextButton);
    });
  });

  test('if it is able to redirect to PokemonDetails', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pokemonDetailsLink = screen.getByText('More details');
    userEvent.click(pokemonDetailsLink);
    const favoritePokemonButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritePokemonButton).toBeInTheDocument();
    expect(history.location.pathname).toBe(pokemonDetailsLink.getAttribute('href'));
    userEvent.click(favoritePokemonButton);
    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokemonsLink);
    const pokemonImgs = screen.getAllByRole('img');
    expect(pokemonImgs).toHaveLength(2);
    const starIcon = pokemonImgs[1];
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
