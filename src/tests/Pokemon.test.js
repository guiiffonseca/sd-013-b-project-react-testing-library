import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import Data from '../data';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        {componentToRender}
      </Router>,
    ),
    history: customHistory,
  };
}

const pokemon = Data[0];
const favorite = true;

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ favorite }
        pokemon={ pokemon }
        showDetailsLink={ favorite }
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);

    const imgUrl = pokemon.image;
    const image = screen.getByAltText(/sprite/);
    expect(image).toHaveAttribute('src', imgUrl);

    const imageFavorite = screen.getByAltText(/is marked as favorite/);
    expect(imageFavorite).toHaveAttribute('src', '/star-icon.svg');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);

    const componentLink = screen.getByRole('link');
    expect(componentLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

    const componentDetails = screen.getByText(/More details/);
    expect(componentDetails).toBeInTheDocument();
  });
});
