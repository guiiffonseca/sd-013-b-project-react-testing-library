import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing the component <Pokemon.js />', () => {
  it('Test if it renders a card with the informations of a certain pokemon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/electric/i);
    const pokeWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pokeWeight).toBeInTheDocument();

    const img = screen.getByAltText(/pikachu sprite/i);
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Test if the Pokémon card on Pokédex contains
      a link to exibit details from the Pokémon`, () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    expect(detailsButton).toBeInTheDocument();
  });

  it(`clicking on the link of the Pokémon, it redirects
      from the aplication to the pokemon details page`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(detailsButton);
    const detailsText = screen.getByRole('heading', { name: /Pikachu details/i });
    expect(detailsText).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Test if exists an icon of a star in the favourite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);
    history.push('/');
    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
