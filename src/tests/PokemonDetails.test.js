import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing the component <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  it('Test if the informations of the selected Pokemon are show in the screen', () => {
    const detailsText = screen.getByRole('heading', {
      name: /Pikachu details/i,
      level: 2,
    });
    expect(detailsText).toBeInTheDocument();
    const summaryText = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryText).toBeInTheDocument();
    const aboutPokemon = screen.getByText(
      /This intelligent Pokémon roasts hard berries/i,
    );
    expect(aboutPokemon).toBeInTheDocument();
  });

  it(`Test if exists in the page a section with the maps 
  containing the locations of the pokemon`, () => {
    const locations = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(locations).toBeInTheDocument();

    const img = screen.getAllByAltText(/pikachu location/i);
    expect(img[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Test if the user can favourite a pokemon using the details page', () => {
    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteButton);
    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
  });
});
