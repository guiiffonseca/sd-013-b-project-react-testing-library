import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokemon page', () => {
  it('should show the correct name of pokemon', () => {
    pokemons.forEach(({ id, name }, index) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getAllByTestId('pokemon-name')[index]).toHaveTextContent(name);
    });
  });

  it('should show the correct weight of pokemon', () => {
    pokemons.forEach(({ id, averageWeight: { value, measurementUnit } }, index) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getAllByTestId('pokemon-weight')[index])
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });
  });

  it('should show the correct type of pokemons', () => {
    pokemons.forEach(({ id, type }, index) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getAllByTestId('pokemon-type')[index]).toHaveTextContent(type);
    });
  });

  it('should show the corret img', () => {
    pokemons.forEach(({ id, name, image }) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const img = screen.getByAltText(`${name} sprite`);
      expect(img.src).toBe(image);
      expect(img.alt).toBe(`${name} sprite`);
    });
  });

  it('should have "more details" option for all pokemons on pokedex', () => {
    renderWithRouter(<App />);
    for (let c = 0; c <= pokemons.length; c += 1) {
      expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    }
  });

  it('should have "more details" option on pokedex', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('should have a star img in bookmarkeds pokemons', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);
    userEvent.click(screen.getByLabelText(/Pokémon favorito?/i));
    userEvent.click(screen.getByRole('link', { name: /Home/i }));
    const starImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
});
