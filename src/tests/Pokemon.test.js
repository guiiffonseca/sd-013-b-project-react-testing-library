import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRoutes from '../utils/renderWithRoutes';

import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Pokemon.js', () => {
  it('should render a card with the info of a pokemon', () => {
    const testPokemon = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'This intelligent Pokémon roasts hard berries with'
      + ' electricity to make them tender enough to eat.',
    };
    renderWithRoutes(<Pokemon isFavorite={ false } pokemon={ testPokemon } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonDetailsLink = screen.getByRole('link');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(`${testPokemon.name}`);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(`${testPokemon.type}`);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(
      'Average weight: '
      + `${testPokemon.averageWeight.value} ${testPokemon.averageWeight.measurementUnit}`,
    );
    expect(pokemonDetailsLink).toBeInTheDocument();
    expect(pokemonDetailsLink).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);
    expect(pokemonDetailsLink).toHaveTextContent('More details');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', `${testPokemon.name} sprite`);
  });

  it('should be able to redirect to PokemonDetails page', () => {
    const { history } = renderWithRoutes(<App />);
    const pokemonDetailsLink = screen.getByText('More details');

    fireEvent.click(pokemonDetailsLink);

    const detailsPage = screen.getByLabelText('Pokémon favoritado?');

    expect(detailsPage).toBeInTheDocument();
    expect(history.location.pathname).toBe(pokemonDetailsLink.getAttribute('href'));
  });

  it('should have a star symbol on favorite pokemons', () => {
    const testPokemon = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'This intelligent Pokémon roasts hard berries with'
      + ' electricity to make them tender enough to eat.',
    };
    renderWithRoutes(<Pokemon isFavorite pokemon={ testPokemon } />);
    const pokemonImgs = screen.getAllByRole('img');

    expect(pokemonImgs).toHaveLength(2);

    const starIcon = pokemonImgs[1];

    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', `${testPokemon.name} is marked as favorite`);
  });
});
