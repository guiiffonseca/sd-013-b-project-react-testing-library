import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing cases of PokemonDetails component', () => {
  test('shows the detailed information of pokemon by clicking the link', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(detailsTitle).toBeInTheDocument();
  });

  test('location info about detailed pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const locationsTitle = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
    });
    const pokemonLocation = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(locationsTitle).toBeInTheDocument();
    expect(pokemonLocation.length).toStrictEqual(pokemons[0].foundAt.length);
    expect(pokemonLocation[0]).toHaveAttribute('src', `${pokemons[0].foundAt[0].map}`);
  });

  test('summary infos about pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
    });
    const summaryParagraph = screen.getByText(pokemons[0].summary);
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('favorite checkbox is available on pokemon details', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const favoriteIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(favoriteCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
