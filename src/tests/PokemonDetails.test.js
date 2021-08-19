import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('pokemonDetails test', () => {
  test('exibe details, summary e um paragráfo com um resumo', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/pokemons/25');

    const name = 'Pikachu';
    const searchDetails = screen.getByText(`${name} Details`);
    expect(searchDetails).toBeInTheDocument();

    const searchSummary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(searchSummary).toBeInTheDocument();

    const searchParagraph = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(searchParagraph).toBeInTheDocument();
  });

  test('exibe Game Locations, numero de localizações e seus nomes', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/pokemons/4');

    const name = 'Charmander';
    const searchGameLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(searchGameLocations).toBeInTheDocument();

    const searchImg = screen.getAllByAltText('Charmander location');
    const counterImage = 4;
    expect(searchImg.length).toBe(counterImage);
    // console.log(image[0].src);
    expect(searchImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
    expect(searchImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png');
    expect(searchImg[2].src).toBe('https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png');
    expect(searchImg[3].src).toBe('https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png');

    const searchNameLocation1 = screen.getByText(/Alola Route 3/i);
    expect(searchNameLocation1).toBeInTheDocument();
    const searchNameLocation2 = screen.getByText(/Kanto Route 3/i);
    expect(searchNameLocation2).toBeInTheDocument();
    const searchNameLocation3 = screen.getByText(/Kanto Route 4/i);
    expect(searchNameLocation3).toBeInTheDocument();
    const searchNameLocation4 = screen.getByText(/Kanto Rock Tunnel/i);
    expect(searchNameLocation4).toBeInTheDocument();
  });

  test('exibe Game Locations, numero de localizações e seus nomes', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/pokemons/4');

    const searchInput = screen.getByRole('checkbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    expect(searchInput).toBeChecked();

    const searchText = screen.getByText(/Pokémon favoritado?/i);
    expect(searchText).toBeInTheDocument();
  });
});
