import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Requisito 7', () => {
  const pokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const pokemonName = screen.getByRole('heading', {
      level: 2,
      name: `${pokemon.name} Details`,
    });
    expect(pokemonName).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryText = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summaryText).toBeInTheDocument();

    const pokemonAbstract = screen.getByText(pokemon.summary);
    expect(pokemonAbstract).toBeInTheDocument();
  });

  it('Existe na página uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const gameDetailsText = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemon.name}`,
    });
    expect(gameDetailsText).toBeInTheDocument();
    expect(gameDetailsText).toContainHTML('Game Locations of Pikachu');

    const allLocations = screen.getAllByAltText(`${pokemon.name} location`);
    expect(allLocations.length).toBe(2);
    expect(allLocations[0]).toHaveProperty('alt', 'Pikachu location');
    expect(allLocations[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?', {
      selector: 'input',
    });
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).not.toBeChecked();
    userEvent.click(favoritePokemon);
    expect(favoritePokemon).toBeChecked();
  });
});
