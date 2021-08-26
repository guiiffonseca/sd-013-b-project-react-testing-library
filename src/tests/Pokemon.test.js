import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokémon test', () => {
  test('página possui card com informações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();

    const pikachuImage = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImage).toBeInTheDocument();
  });

  test('card possui um link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('redireciona para página de detalhes ao clicar no link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const detailsText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(detailsText).toBeInTheDocument();
  });

  test('URL possui id', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('pokémons favoritados possuem ícone de estrela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const favoritePokemon = screen.getByRole('checkbox');

    userEvent.click(favoritePokemon);

    const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon).toBeInTheDocument();
  });
});
