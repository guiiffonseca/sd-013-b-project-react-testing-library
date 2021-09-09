import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste pokemon details', () => {
  test('verifica se pokemon details renderiza as infomacao do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const moreDetailsTitulo = screen.getByRole('heading', {
      level: 2,
      name: /Charmander Details/i,
    });
    expect(moreDetailsTitulo).toBeInTheDocument();
    const textSummary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(textSummary).toBeInTheDocument();
    const paragrafo = screen.getByText(/The flame on its tail shows the strength /i);
    expect(paragrafo).toBeInTheDocument();
  });
  test('verifica secao no mapa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const locationInGame = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Charmander/i,
    });
    expect(locationInGame).toBeInTheDocument();
    const locationMap = screen.getAllByAltText(/Charmander location/i);
    const maps = 4;
    expect(locationMap.length).toBe(maps);
    const mapAlola = screen.getByText(/Alola Route 3/i);
    expect(mapAlola).toBeInTheDocument();
    const mapKantoRtres = screen.getByText(/Kanto Route 3/i);
    expect(mapKantoRtres).toBeInTheDocument();
    const mapKantoQuatro = screen.getByText(/Kanto Route 4/i);
    expect(mapKantoQuatro).toBeInTheDocument();
    const mapKantoTunnel = screen.getByText(/Kanto Rock Tunnel/i);
    expect(mapKantoTunnel).toBeInTheDocument();
    expect(locationMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
    expect(locationMap[0]).toHaveAttribute('alt', 'Charmander location');
  });
  test('Verifique se um usuário pode adicionar um Pokémon como favorito', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.dblClick(checkboxFavorite);
    const totalImg = screen.getAllByRole('img');
    const numberCount = 5;
    expect(totalImg.length).toBe(numberCount);
    const label = screen.getByText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
