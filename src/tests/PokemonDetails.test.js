import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <PokemonDetails />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('A página contém um texto <name> Details com o nome do pokemon', () => {
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);

    const { name } = pokemons[0];
    const title = screen.getByText(`${name} Details`);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`${name} Details`);
  });

  test('Não contém links de navegação nos detalhes', () => {
    const detailsLinks = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLinks);
    expect(detailsLinks).not.toBeInTheDocument();
  });

  test('A página contém um h2 com o texto "Summary"', () => {
    const textDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(textDetails);
    const { summary } = pokemons[0];

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    const text = screen.getByText(summary);
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryTitle).toHaveTextContent(/summary/i);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(summary);
  });

  test(' É possivel favoritar um pokemon', () => {
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    const { name } = pokemons[0];

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favorite = screen.getByAltText(`${name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();
  });

  test('Existe uma area com mapas na tela', () => {
    const mapDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(mapDetails);
    const { name, foundAt } = pokemons[0];

    const mapLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(mapLocation).toBeInTheDocument();
    expect(mapLocation).toHaveTextContent(`Game Locations of ${name}`);

    const maps = screen.getAllByAltText(`${name} location`);

    foundAt.forEach(({ map, location }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(maps[index]).toHaveAttribute('src', map);
    });
  });
});
