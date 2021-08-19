import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import App from '../App';

describe('Informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
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
  };
  test('Todas a informções do Pokemon devem ser mostradas na tela', () => {
    const paragraphRegex = /This intelligent Pokémon roasts hard berries/i;
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
      />,
    );
    const detailsText = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    const summaryParagraph = screen.getByText(paragraphRegex);
    expect(detailsText).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com mapas contendo as localizações', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
      />,
    );
    const gameLocationsText = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemon.name}`,
    });
    const imagesLocations = screen.getAllByAltText('Pikachu location');
    const firstLocationText = screen.getByText(/Kanto Viridian Forest/i);
    const secondLocationText = screen.getByText(/Kanto Power Plant/i);
    expect(gameLocationsText).toBeInTheDocument();
    expect(imagesLocations[0]).toBeInTheDocument();
    expect(imagesLocations[1]).toBeInTheDocument();
    expect(imagesLocations.length).toBe(2);
    expect(firstLocationText).toBeInTheDocument();
    expect(secondLocationText).toBeInTheDocument();
    expect(imagesLocations[0].src).toBe(pokemon.foundAt[0].map);
    expect(imagesLocations[1].src).toBe(pokemon.foundAt[1].map);
    expect(imagesLocations[0].alt).toBe(`${pokemon.name} location`);
  });
  test('Teste se o usuário pode favoritar um pokémon pela página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toBe(true);
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toBe(false);
    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
