import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import App from '../App';

describe('testes do componente Pokemon', () => {
  test('testa se renderiza um card c infos de um pokemon', () => {
    const { history } = renderWithRouter(<Pokedex />);
    history.push('/');
    const pikachuName = screen.getByText(pokemons[0].name);
    expect(pikachuName).toBeInTheDocument();
    const pikachuType = screen.getAllByText(pokemons[0].type);
    expect(pikachuType).toBeInTheDocument();
    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();
    const pikachuImage = screen.getAllByRole('img');
    expect(pikachuImage[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pikachuImage[0]).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
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
