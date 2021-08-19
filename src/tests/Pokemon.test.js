import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testar o component Pokemon.js', () => {
  test('Testar se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent(/pikachu/i);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent(/electric/i);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const pokeImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Testar more details, e se existe um icone de estrela nos Pokemons favoritos',
    () => {
      const { history } = renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(detailsLink).toBeInTheDocument();
      userEvent.click(detailsLink);
      const { pathname } = history.location; // como ensinado na aula do icaro
      expect(pathname).toEqual('/pokemons/25'); // default pikachu

      const favoritePokemon = screen.getByRole('checkbox');
      expect(favoritePokemon).toBeInTheDocument();
      userEvent.click(favoritePokemon);

      const favoriteDefault = screen.getByAltText(
        'Pikachu is marked as favorite',
      );
      expect(favoriteDefault).toBeInTheDocument();
      expect(favoriteDefault).toHaveAttribute('src', '/star-icon.svg');
    });
});
