import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('"Pokemon" component testing', () => {
  it('contains a Pokemon Card with information', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg)
      .toHaveAttribute(
        'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      );
  });
  it('contains "more details" link', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);
    expect(detailsLink)
      .toHaveAttribute(
        'href', '/pokemons/25',
      );
  });
  it('"details link" redirects to "details" page', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);
    const detailsHeader = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(detailsHeader).toBeInTheDocument();
  });
  it('page URL contains "pokemons/<id>"', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });
  it('page URL contains "pokemons/<id>"', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);
    const bookmarkCheckbox = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(bookmarkCheckbox);
    const favoriteIcon = screen.getByAltText(/marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon)
      .toHaveAttribute(
        'src', '/star-icon.svg',
      );
    expect(favoriteIcon)
      .toHaveAttribute(
        'alt', 'Pikachu is marked as favorite',
      );
  });
});
