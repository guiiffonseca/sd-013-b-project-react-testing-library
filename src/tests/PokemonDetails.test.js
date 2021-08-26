import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';

describe(('FavoritePokemons.js tests'), () => {
  const mewPageId = '/pokemons/151';

  test('Testa se as informações do Pokémon selecionado estão na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewPageId);

    const pokemonDetailsHeadingText = screen.getByRole('heading', {
      level: 2,
      name: /Mew Details/i,
    });

    const detailsLink = screen.queryByText('More details');

    const pokemonDetailsSummaryText = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    const pokemonDetailsText = screen.getByText(
      'Apparently, it appears only to those people who are pure of'
        + ' heart and have a strong desire to see it.',
    );

    expect(pokemonDetailsHeadingText).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(pokemonDetailsSummaryText).toBeInTheDocument();
    expect(pokemonDetailsText).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewPageId);

    const pokemonDetailsMapText = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Mew/i,
    });

    const gameLocationsMew = screen.getByText('Faraway Island');
    const gameLocationsMewImage = screen.getByAltText('Mew location');

    expect(pokemonDetailsMapText).toBeInTheDocument();
    expect(gameLocationsMew).toBeInTheDocument();
    expect(gameLocationsMewImage.src).toContain('https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
  });

  test('Testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewPageId);

    const favoritePokemon = screen.getByRole('checkbox');
    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteLabel).toBeInTheDocument();

    fireEvent.click(favoritePokemon);

    const star = screen.getByAltText('Mew is marked as favorite');

    expect(star).toBeInTheDocument();

    fireEvent.click(favoritePokemon);

    expect(star).not.toBeInTheDocument();
  });
});
