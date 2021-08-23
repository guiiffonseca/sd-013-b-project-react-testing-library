import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../unit/renderWithRouter';
import pokemons from '../data';

describe('Requisito 7', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
  });

  test('As informações detalhadas do Pokemon selecionado deve ser exibidas', () => {
    const { name, summary } = pokemons[0];
    const pageTitle = screen.getByRole('heading', { leve: 2, name: `${name} Details` });
    const linksOnthisPage = screen.getAllByRole('link');
    const numbeOfLinks = 3;
    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    const pokemonSummary = screen.getByText(summary);
    expect(pageTitle).toBeInTheDocument();
    expect(linksOnthisPage).toHaveLength(numbeOfLinks);
    expect(summaryHeading).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('Deve existir na página uma seção contendo as localizações do pokemon', () => {
    const { name, foundAt } = pokemons[0];
    const sectionTitle = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(sectionTitle).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      const localTitle = screen.getByText(location);
      const mapImage = screen.getAllByAltText(`${name} location`);
      expect(localTitle).toBeInTheDocument();
      expect(mapImage[index].src).toBe(map);
    });
  });

  test('Teste se o usuário pode favoritar um pokemon'
  + ' através da página de detalhes', () => {
    const { name } = pokemons[0];
    const favoritecheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    expect(favoritecheckbox).toBeInTheDocument();
    fireEvent.click(favoritecheckbox);
    const favoritedPokemonimage = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritedPokemonimage).toBeInTheDocument();
    fireEvent.click(favoritecheckbox);
    expect(favoritedPokemonimage).not.toBeInTheDocument();
  });
});
