import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(detailsLink);
    const name = screen.getByText(/Pikachu details/i);
    expect(name).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const summary = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('Se existe uma seção com os mapas contendo as localizações do PK', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(detailsLink);
    const locations = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(locations).toBeInTheDocument();
    const imageLocation = screen.getAllByRole('img',
      { name: 'Pikachu location' });
    expect(imageLocation.length).toBe(2);
    const nameLocation = screen.getByText(/Kanto Viridian Forest/i, /Kanto Power Plant/i);
    expect(nameLocation).toBeInTheDocument();
    expect(imageLocation[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocation[0]).toBeInTheDocument();
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(detailsLink);
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(checkbox);
    const favorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();
  });
});
