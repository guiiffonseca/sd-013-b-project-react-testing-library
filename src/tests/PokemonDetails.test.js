import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o component Pokémon Details', () => {
  test('Se as informações detalhadas do Pokémon são renderizadas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    const paragraph = screen.getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make'
        + ' them tender enough to eat.',
    );

    expect(heading).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('Se existe os mapas contendo a localização do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const firstLocation = screen.getByText('Kanto Viridian Forest');
    const secondLocation = screen.getByText('Kanto Power Plant');
    const locationImg = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });

    expect(gameLocations).toBeInTheDocument();
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();

    expect(locationImg.length).toBe(2);
    expect(locationImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImg[0].alt).toBe('Pikachu location');
    expect(locationImg[1].alt).toBe('Pikachu location');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    const favorited = screen.getByAltText('Pikachu is marked as favorite');

    expect(favorited).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favorited).not.toBeInTheDocument();
  });
});
