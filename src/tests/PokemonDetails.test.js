import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helper/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('test component PokeDetails', () => {
  it('should render info upon mais detalhes click', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    const { id, name } = pokemons[0];
    expect(pathname).toStrictEqual(`/pokemons/${id}`);
    const nameDetails = screen.getByText(`${name} Details`);
    expect(nameDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summ = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summ).toBeInTheDocument();
    const text = screen.getByText(/roasts hard/i);
    expect(text).toBeInTheDocument();
  });

  it('should render maps with pokeLocations', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { name } = pokemons[0];
    const gLocations = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(gLocations).toBeInTheDocument();
    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps.length).toBe(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('should enable favPoke feature', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const checkBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkBox).toBeInTheDocument();
    userEvent.click(checkBox);
    const favCheck = screen.getByAltText('Pikachu is marked as favorite');
    expect(favCheck).toBeInTheDocument();
    expect(favCheck).toHaveAttribute('src', '/star-icon.svg');
  });
});
