import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

const pokemonId = 5;
const mockedPokemon = pokemons[pokemonId];

describe('7. Testa o componente `<PokemonDetails.js />`', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${mockedPokemon.id}`);

    const nameDetails = screen.getByText(`${mockedPokemon.name} Details`);
    const summaryHeading = screen.queryByRole('heading', { name: /Summary/i });
    const summaryText = screen.getByText(/Apparently, it appears only/i);
    const detailLink = screen.queryByRole('link', { name: /more details/i });

    expect(nameDetails).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryText).toHaveTextContent(mockedPokemon.summary);
    expect(detailLink).not.toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${mockedPokemon.id}`);

    const locationsHeading = screen.getByText(`Game Locations of ${mockedPokemon.name}`);
    const mapLocation = screen
      .queryByRole('img', { name: `${mockedPokemon.name} location` });
    const locationName = screen.getByText(mockedPokemon.foundAt[0].location);

    expect(locationsHeading).toBeInTheDocument();
    expect(mapLocation.src).toBe(mockedPokemon.foundAt[0].map);
    expect(locationName).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${mockedPokemon.id}`);
    const favoritedCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);

    expect(favoritedCheckbox).toBeInTheDocument();
    expect(screen.queryByAltText(`${mockedPokemon.name} is marked as favorite`))
      .toBeNull();

    userEvent.click(favoritedCheckbox);
    expect(screen.queryByAltText(`${mockedPokemon.name} is marked as favorite`))
      .toBeInTheDocument();

    userEvent.click(favoritedCheckbox);
    expect(screen.queryByAltText(`${mockedPokemon.name} is marked as favorite`))
      .toBeNull();
  });
});
