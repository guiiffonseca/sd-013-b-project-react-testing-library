import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  const historypush = 'pokemons/4';
  it('Testa se as informações detalhadas são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historypush);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Charmander Details' });
    const detailsLink = screen.queryByText('More details');
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const detailsText = screen.getByText('The flame on its tail shows the strength of its'
    + ' life force. If it is weak, the flame also burns weakly.');

    expect(h2).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(detailsText).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historypush);
    const mapsH2 = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Charmander' });
    const map1 = screen.getByText('Alola Route 3');
    const map2 = screen.getByText('Kanto Route 3');
    const map3 = screen.getByText('Kanto Route 4');
    const map4 = screen.getByText('Kanto Rock Tunnel');
    const mapImg1 = 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png';
    const mapImg2 = 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png';
    const mapImg3 = 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png';
    const mapImg4 = 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png';
    const mapImgs = [mapImg1, mapImg2, mapImg3, mapImg4];
    const imgs = screen.getAllByAltText('Charmander location');

    expect(mapsH2).toBeInTheDocument();
    expect(map1).toBeInTheDocument();
    expect(map2).toBeInTheDocument();
    expect(map3).toBeInTheDocument();
    expect(map4).toBeInTheDocument();
    for (let i = 0; i < imgs.length; i += 1) {
      expect(imgs[i].src).toBe(mapImgs[i]);
    }
  });

  it('Testa se é possível favoritar um pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historypush);
    const label = screen.getByLabelText('Pokémon favoritado?');

    expect(label).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    const favIconOn = screen.getByAltText('Charmander is marked as favorite');
    expect(favIconOn).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favIconOn).not.toBeInTheDocument();
  });
});
