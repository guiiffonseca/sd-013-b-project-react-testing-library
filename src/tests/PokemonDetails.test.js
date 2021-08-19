import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa component Pokemon Details', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado e exibida', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/More details/i);
    fireEvent.click(details);
    const pikachuDetails = screen.getByText(/Pikachu Details/i);
    expect(pikachuDetails).toBeInTheDocument();
    const headingTwo = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(headingTwo).toBeInTheDocument();
    const detailsNull = screen.queryByText(/More details/);
    expect(detailsNull).toBeNull();
    const aboutPokemon = screen.getByText(/This intelligent Pokémon roasts hard berries/);
    expect(aboutPokemon).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/));
    const pikachu = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(pikachu).toBeInTheDocument();

    const locationPikachu = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationPikachu).toHaveLength(2);
    expect(locationPikachu[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationPikachu[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const nameForest = screen.getByText('Kanto Viridian Forest');
    expect(nameForest).toBeInTheDocument();

    const plant = screen.getByText('Kanto Power Plant');
    expect(plant).toBeInTheDocument();
  });

  test('Teste se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/));

    const markFavorite = screen.getByRole('checkbox');
    expect(markFavorite).toBeInTheDocument();
    fireEvent.click(markFavorite);

    const pikachuFavorite = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(pikachuFavorite).toBeInTheDocument();

    fireEvent.click(markFavorite);
    const labelPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(labelPokemon).toBeInTheDocument();
  });
});
