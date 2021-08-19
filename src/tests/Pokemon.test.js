import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helper/RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testing Pokemon.js component', () => {
  it('should render a pokecard on the screen with its correct info', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

      const pokeName = screen.getByTestId('pokemon-name');
      const pokeType = screen.getByTestId('pokemon-type');
      const pokeWeight = screen.getByTestId('pokemon-weight');
      const pokeImg = screen.getByRole('img');
      const next = screen.getByRole('button', { name: /Próximo pokémon/i });

      expect(pokeName).toBeInTheDocument();
      expect(pokeName).toHaveTextContent(name);
      expect(pokeType).toBeInTheDocument();
      expect(pokeType).toHaveTextContent(type);
      expect(pokeWeight).toBeInTheDocument();
      expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(pokeImg).toBeInTheDocument();
      expect(pokeImg).toHaveAttribute('src', image);
      expect(pokeImg).toHaveAttribute('alt', `${name} sprite`);

      userEvent.click(next);
    });
  });

  it('Should go to pokedetails upon mais detalhes click', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('should mark up as favorite', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);

    const favImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
