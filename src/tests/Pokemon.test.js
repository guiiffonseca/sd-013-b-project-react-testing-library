import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/helper';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  test('è renderizado um card com informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/Electric/i);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();

    const pokeWeightText = screen.getByText(/Average weight/i);
    expect(pokeWeightText).toBeInTheDocument();

    const pokeWeightUnit = screen.getByText(/kg/i);
    expect(pokeWeightUnit).toBeInTheDocument();

    const pokeImage = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokeImage).toHaveAttribute('src', src);
    expect(pokeImage).toHaveAttribute('alt', 'Pikachu sprite');

    const moreDetailsLink = screen.getByText(/More details/i);
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(pokeDetails).toBeInTheDocument();

    const pokeUrl = history.location.pathname;
    expect(pokeUrl).toBe('/pokemons/25');

    const addAsFav = screen.getByRole('checkbox', { name: /Pokémon Favoritado/i });
    userEvent.click(addAsFav);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    const srcIcon = '/star-icon.svg';
    expect(favIcon).toHaveAttribute('src', srcIcon);
    expect(favIcon).toBeInTheDocument();
  });
});
