import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa se renderiza um card com informações do pokemon', () => {
  test('Deveria exibir as informações do pokemon', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const pokemonImg = screen.getByRole('img');
      const pokemonSprite = screen.getByAltText(/sprite/i);
      const btn = screen.getByText(/próximo pokémon/i);

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
      expect(weight).toBeInTheDocument();
      expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonImg).toBeInTheDocument();
      expect(pokemonImg).toHaveAttribute('src', image);
      expect(pokemonSprite).toHaveAttribute('alt', `${name} sprite`);
      userEvent.click(btn);
    });
  });
});

describe('Testa link Detalhes e suas funcionalidades', () => {
  test('Deveria exibir link para detalhes desde pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    expect(details).toBeInTheDocument();
  });
  test('Deveria redirecionar a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  // });

  // describe('Testa favoritos e suas funcionalidades', () => {
  test('Deveria existir estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    userEvent.click(details);
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    // const star = screen.getAllByRole('img')[1];
    const star = screen.getByAltText(/marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
