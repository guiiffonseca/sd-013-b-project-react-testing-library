import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const PATH_CHARMANDER = '/pokemons/4';

describe('Test of component <PokemonDetails />', () => {
  test('Verify pokemon details informations are show in screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_CHARMANDER);
    const moreDetailsTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Charmander Details',
    });
    expect(moreDetailsTitle).toBeInTheDocument();
    // const linkMoreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    // expect(linkMoreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const abstractPokemon = screen.getByText(/The flame on its tail/i);
    expect(abstractPokemon).toBeInTheDocument();
  });

  test('Verify section of maps', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_CHARMANDER);
    const textLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Charmander/i,
    });
    expect(textLocation).toBeInTheDocument();
    const mapsCharmander = screen.getAllByAltText('Charmander location');
    const numberOfMaps = 4;
    expect(mapsCharmander.length).toBe(numberOfMaps);
    const nameFirstMap = screen.getByText('Alola Route 3');
    expect(nameFirstMap).toBeInTheDocument();
    const nameSecondMap = screen.getByText('Kanto Route 3');
    expect(nameSecondMap).toBeInTheDocument();
    const nameThirdMap = screen.getByText('Kanto Route 4');
    expect(nameThirdMap).toBeInTheDocument();
    const nameFourthMap = screen.getByText('Kanto Rock Tunnel');
    expect(nameFourthMap).toBeInTheDocument();
    expect(mapsCharmander[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
    expect(mapsCharmander[0]).toHaveAttribute('alt', 'Charmander location');
  });

  test('Verify if a user can favorite one pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_CHARMANDER);
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.dblClick(checkboxFavorite);
    const numberOfImages = screen.getAllByRole('img');
    const count = 5;
    expect(numberOfImages.length).toBe(count);
    const label = screen.getByText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
