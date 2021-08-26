import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails.js', () => {
  const pokemon = pokemons[0];
  const { name, summary, foundAt } = pokemon;

  beforeEach(() => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
  });

  test('Deve conter informações detalhadas do Pokémon selecionado', () => {
    const heading = screen.queryByText(`${name} Details`);
    expect(heading).toBeInTheDocument();

    const details = screen.queryByRole('link', { name: /more details/i });
    expect(details).not.toBeInTheDocument();

    const summaryTitle = screen.queryByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryTitle).toBeInTheDocument();

    const text = screen.queryByText(summary);
    expect(text).toBeInTheDocument();
  });

  test('Deve haver uma seção com os mapas contendo as localizações do pokémon', () => {
    const heading = screen.queryByText(`Game Locations of ${name}`);
    expect(heading).toBeInTheDocument();

    const mapsOnScreen = screen.queryAllByAltText(`${name} location`);
    foundAt.forEach(({ location, map }) => {
      const locationMap = mapsOnScreen.filter((item) => item.src === map)[0];
      expect(locationMap).toBeInTheDocument();

      const locationName = screen.queryByText(location);
      expect(locationName).toBeInTheDocument();
    });
  });

  test('O usuário deve poder favoritar um pokémon ', () => {
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const checkboxLabel = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkboxLabel);

    const star = screen.queryByAltText(`${name} is marked as favorite`);
    expect(star).toBeInTheDocument();

    userEvent.click(checkboxLabel);
    expect(star).not.toBeInTheDocument();
  });
});
