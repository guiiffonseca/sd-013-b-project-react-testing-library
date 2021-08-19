import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderRouter from '../components/renderRouter';

describe('Pokemon detalhes e mapas ', () => {
  test('Testa se as informações detalhadas são renderizadas de forma correta', () => {
    const { history } = renderRouter(<App />);
    const maisDetalhes = screen.getByRole('link', {
      name: 'More details',
    });
    expect(maisDetalhes).toBeInTheDocument();
    userEvent.click(maisDetalhes);
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');
    const pokemonDetails = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(maisDetalhes).not.toBeInTheDocument();
    const sinopse = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(sinopse).toBeInTheDocument();
    const pokemonSinopse = screen.getByText(/This intelligent Pokémon/i);
    expect(pokemonSinopse).toBeInTheDocument();
    const Locations = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(Locations).toBeInTheDocument();
    const Maps = screen.getAllByAltText('Pikachu location');
    expect(Maps.length).toEqual(2);
    expect(Maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(Maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const viridiaForestMap = screen.getByText('Kanto Viridian Forest');
    expect(viridiaForestMap).toBeInTheDocument();
    const powerPlantMap = screen.getByText('Kanto Power Plant');
    expect(powerPlantMap).toBeInTheDocument();
    const favoritosCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoritosCheck).toBeInTheDocument();
    userEvent.click(favoritosCheck);
    const FavCheckIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(FavCheckIcon).toBeInTheDocument();
    expect(FavCheckIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
