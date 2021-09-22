import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Sobre a tela de detalhes de um Pokemon', () => {
  it('verifica se as informações detalhadas do Pokemon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    fireEvent.click(moreDetailsLink);

    const pokemonNameNode = screen.getByTestId('pokemon-name');
    const pokemonName = pokemonNameNode.textContent;
    const expectedScreenTitleContent = `${pokemonName} Details`;
    const screenTitle = screen.getByText(expectedScreenTitleContent);

    expect(screenTitle).toBeInTheDocument();

    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryTitle = screen.getByText(/Summary/i);
    const expectedSummary = /This intelligent Pokémon roasts hard berries/i;
    const summary = screen.getByText(expectedSummary);

    expect(summaryTitle).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });

  it('verifica a existência dos mapas com a localização dos Pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    fireEvent.click(moreDetailsLink);

    const pokemonNameNode = screen.getByTestId('pokemon-name');
    const pokemonName = pokemonNameNode.textContent;
    const mapTitle = screen.getByText(`Game Locations of ${pokemonName}`);
    expect(mapTitle).toBeInTheDocument();

    const listOfMaps = screen.getAllByAltText(`${pokemonName} location`);
    for (let i = 0; i < listOfMaps.length; i += 1) {
      expect(listOfMaps[i]).toBeInTheDocument();
    }

    const mapDescription = screen.getByText(/Kanto Viridian Forest/i);
    expect(mapDescription).toBeInTheDocument();

    for (let i = 0; i < listOfMaps.length; i += 1) {
      const image = listOfMaps[i];
      expect(image.src).not.toBe('');
      expect(image.alt).toBe(`${pokemonName} location`);
    }
  });

  it('verifica features do botão de favorito', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    fireEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);
    const favoriteIcon = screen.getByTestId('favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();

    const labelText = screen.getByLabelText(/Pokémon favoritado/i);
    expect(labelText).toBeInTheDocument();
  });
});
