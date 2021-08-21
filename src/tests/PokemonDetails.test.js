import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente pokemonDetails', () => {
  test('Testa se há o link More details na tela ', () => {
    const { history } = renderWithRouter(<App />);
    const mDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(mDetails).toBeInTheDocument();
    userEvent.click(mDetails);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const gameLoc = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toEqual(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const mapA = screen.getByText('Kanto Viridian Forest');
    expect(mapA).toBeInTheDocument();
    const mapB = screen.getByText('Kanto Power Plant');
    expect(mapB).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');
    const nDetails = screen.getByText('Pikachu Details');
    expect(nDetails).toBeInTheDocument();
    expect(gameLoc).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    const sumary = screen.getByText(/This intelligent Pokémon/i);
    const pFavoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(sumary).toBeInTheDocument();
    expect(mDetails).not.toBeInTheDocument();
    expect(pFavoritado).toBeInTheDocument();
  });
});
