import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test pokemos details', () => {
  it('should show all corresponding informations about the selected pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /More details/i })).not.toBeInTheDocument();
    const h2 = screen.getByRole('heading', { name: /Summary/i });
    expect(h2).toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  it('should show a h2 element with "Game Locations [pokemon selected name ]"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2[2]).toHaveTextContent(`Game Locations of ${pokemons[0].name}`);
  });

  it('should show all locations of selected pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    pokemons[0].foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      const maps = screen.getAllByAltText(`${pokemons[0].name} location`);
      expect(maps.length).toBe(pokemons[0].foundAt.length);
      expect(maps[index].src).toBe(map);
    });
  });

  it('should have a button to add as bookmarked', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    expect(screen.getByLabelText(/Pokémon favorito?/i)).toBeInTheDocument();
  });

  it('should add and remove bookmark when click on the bookmark button', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    userEvent.click(screen.getByLabelText(/Pokémon favorito?/i));
    const starIcon = screen.queryByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/Pokémon favorito?/i));
    expect(starIcon).not.toBeInTheDocument();
  });
});
