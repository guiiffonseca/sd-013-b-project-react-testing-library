import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
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
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const valueWeight = pokemon.averageWeight.value;
    const unit = pokemon.averageWeight.measurementUnit;
    const msgAverage = `Average weight: ${valueWeight} ${unit}`;
    expect(pokemonWeight).toHaveTextContent(msgAverage);
    const imgUrl = pokemon.image;
    const image = screen.getByAltText(/sprite/);
    expect(image).toHaveAttribute('src', imgUrl);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ favorite }
        pokemon={ pokemon }
        showDetailsLink={ favorite }
      />,
    );
    const componentLink = screen.getByRole('link');
    expect(componentLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite={ favorite }
        pokemon={ pokemon }
        showDetailsLink={ favorite }
      />,
    );
    const componentLink = screen.getByRole('link', { name: /More Details/i });
    expect(componentLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    userEvent.click(componentLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
    userEvent.click(componentLink);
    const imfavorite = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(imfavorite.src).toBe('http://localhost/star-icon.svg');
    expect(imfavorite).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
    expect(imfavorite).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ favorite }
        pokemon={ pokemon }
        showDetailsLink={ favorite }
      />,
    );

    const componentLink = screen.getByRole('link');
    expect(componentLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    expect(componentLink).toHaveTextContent(/More details/);

    const linkDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(linkDetails);
    const imagePikachu = screen.getAllByRole('img')[0];
    expect(imagePikachu.src).toBe(pokemon.image);
    expect(imagePikachu.alt).toBe(`${pokemon.name} sprite`);
  });
});
