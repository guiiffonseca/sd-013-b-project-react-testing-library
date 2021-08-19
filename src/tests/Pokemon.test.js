import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste componente Pokemon', () => {
  it('Verifica se o card contém as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pikachuURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonSprite = screen.getByAltText('Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonSprite).toHaveAttribute('src', pikachuURL);
  });

  it('Verifica se o pokemon possui um link "More details"', () => {
    renderWithRouter(<App />);

    const linkText = screen.getByText(/More details/i);
    expect(linkText).toHaveAttribute('href', '/pokemons/25');
  });

  it('Verifica se clicar em "More details" direciona para informações do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkText = screen.getByText(/More details/i);
    userEvent.click(linkText);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe ícone de estrela no Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const imageFavorited = 'http://localhost/star-icon.svg';

    const buttonNext = screen.getByText(/Próximo pokémon/i);
    userEvent.click(buttonNext);
    const linkText = screen.getByText(/More details/i);
    userEvent.click(linkText);
    const btnFavorited = screen.getByRole('checkbox');
    userEvent.click(btnFavorited);

    const pokemonFavorited = screen.getByAltText('Charmander is marked as favorite');
    expect(pokemonFavorited).toHaveProperty('src', imageFavorited);
  });
});
