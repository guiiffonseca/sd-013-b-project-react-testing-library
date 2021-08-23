import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
  });
  test('Teste se conter um texto <name> Details', () => {
    const details = screen.getByText(`${pokemons[0].name} Details`);
    expect(details).toBeInTheDocument();
  });
  test('Teste se não há link de detalhes do Pokémon selecionado.', async () => {
    const moreDetailsButton = screen.queryByText(/More details/i);
    expect(moreDetailsButton).toBeNull();
  });
  test('Teste se a seção de detalhes contem um h2 com o texto Summary.', () => {
    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');
  });
  test('Teste se a seção de detalhes contem um parágrafo com o resumo do Pokémon', () => {
    const summary = screen.getByText(/This intelligent Pokémon/i);
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('P');
  });
  test('Teste se existe um h2 com o texto Game Locations of <name>.', () => {
    const summary = screen.getByText(`Game Locations of ${pokemons[0].name}`);
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');
  });
  test('Teste se todas as localizações do Pokémon são mostradas.', () => {
    pokemons[0].foundAt.forEach((foundAt) => {
      const locationName = screen.getByText(foundAt.location);
      expect(locationName).toBeInTheDocument();
    });
  });
  test('Teste se é exibido o nome da localização e um mapa.', () => {
    pokemons[0].foundAt.forEach((foundAt) => {
      const locationName = screen.getByText(foundAt.location);
      expect(locationName).toBeInTheDocument();
      const mapImages = screen.getAllByRole('img');
      const maps = mapImages.filter((map) => map.getAttribute('src') === foundAt.map);
      expect(maps.length).toBe(1);
      expect(maps[0]).toHaveAttribute('alt', `${pokemons[0].name} location`);
    });
  });
  test('Teste se é exibidoum checkbox que permite favoritar.', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox.getAttribute('type')).toBe('checkbox');
  });
  test('Teste se cliques alternam o estado de favorito do Pokémon.', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
