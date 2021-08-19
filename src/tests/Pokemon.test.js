import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste App ', () => {
  test('Card com informações ', () => {
    renderWithRouter(<App />);
    const PokemonName = screen.getByTestId('pokemon-name');
    expect(PokemonName).toBeInTheDocument();
    expect(PokemonName.innerHTML).toMatch('Pikachu');

    const PokemonTipo = screen.getByTestId('pokemon-type');
    expect(PokemonTipo).toBeInTheDocument();
    expect(PokemonTipo.innerHTML).toMatch('Electric');

    const PokemonPeso = screen.getByTestId('pokemon-weight');
    expect(PokemonPeso).toBeInTheDocument();
    expect(PokemonPeso.innerHTML).toMatch('Average weight: 6.0 kg');

    const PokemonImage = screen.getByRole('img');
    expect(PokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(PokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Test Route More Details', () => {
    const { history } = renderWithRouter(<App />);
    const MoreDetails = screen.getByText('More details');
    expect(MoreDetails).toBeInTheDocument();
    expect(MoreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(MoreDetails);
    const { pathname } = history.location;
    expect(pathname).toContain('/pokemons/25');
  });

  test('Icone de estrela', () => {
    renderWithRouter(<App />);
    const MoreDetails = screen.getByText('More details');
    userEvent.click(MoreDetails);
    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    const Home = screen.getByText('Home');
    userEvent.click(Home);
    const Favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(Favorite).toBeInTheDocument();
    expect(Favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
