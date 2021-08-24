import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe(' Teste o componente <Pokemon.js />', () => {
  it('test if there is a rendered card with pokemon info', () => {
    // Render the app in the virtual browser
    renderWithRouter(<App />);

    // Get the elements from the screen using the already done datatest ids:
    const PokemonName = screen.getByTestId('pokemon-name');
    const PokemonType = screen.getByTestId('pokemon-type');
    const PokemonWeight = screen.getByTestId('pokemon-weight');
    const PokemonImage = screen.getByAltText(/sprite/i); // Using RegEx because getByRole is not working, and the alt text is alt={ `${name} sprite` }, so it always end with the word sprite.

    // Test if the info have the correct content:
    expect(PokemonName).toHaveTextContent('Pikachu');
    expect(PokemonType).toHaveTextContent('Electric');

    // I have to get some destructured data from the file data.js, in order to test the average weight:
    const { averageWeight: { value, measurementUnit } } = pokemons[0]; // this is the first element from the list, pikachu.

    // The pokemon weight must display this exact text:
    expect(PokemonWeight)
      .toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

    expect(PokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('test if the card has an nav card to show more details about the pokemon', () => {
    // Render the app in the virtual browser
    renderWithRouter(<App />);

    // Get the link element using RegEx(Flag i - case insensitive) :
    const Details = screen.getByText(/More details/i);

    // Expect details to exist:
    expect(Details).toBeInTheDocument();

    // The link must have an URL /pokemons/<id>, where 25 is the id from the first pokemon:
    expect(Details).toHaveAttribute('href', '/pokemons/25');
  });

  it('test if the link more details redirect to the correct page', () => {
    // Render the app in the virtual browser
    renderWithRouter(<App />);

    // Get the link element using RegEx(Flag i - case insensitive):
    const Details = screen.getByText(/More details/i);

    // Mock the user click:
    userEvent.click(Details);

    // Get the h2 element from the MoreDetails page:
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    // Test if the link redirects to the correct page (the page must have the following h2 element):
    expect(title).toBeInTheDocument();
  });

  it('test if the url changes to: /pokemon/<id>', () => {
    // Get the history inside the Route:
    const { history } = renderWithRouter(<App />);

    // Get the link using RegEx:
    const Details = screen.getByRole('link', { name: /More details/i });

    // Mock the user click:
    userEvent.click(Details);

    // Get the pathname from the history that was recorded inside of the Route:
    const { pathname } = history.location;

    // Expect the URL to be correct:
    expect(pathname).toBe('/pokemons/25'); // The first pokemon id is 25
  });

  it('test if there is an star icon in the favorite pokemon', () => {
    // Render the app in the virtual browser
    renderWithRouter(<App />);

    // Get the link element from the App screen:
    const Details = screen.getByText(/More details/);

    // Mock the user click:
    userEvent.click(Details);

    // Get the elements inside the details page:
    const Checkbox = screen.getByRole('checkbox');

    // Expect the checkbox to exist:
    expect(Checkbox).toBeInTheDocument();

    // Mock the user click on checkbox:
    userEvent.click(Checkbox);

    // Get the icon element inside the favorite session:
    const FavoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);

    // See if the favorite icon to exists:
    expect(FavoriteIcon).toBeInTheDocument();

    // See if the icon is there:
    userEvent.click(Checkbox);
    expect(FavoriteIcon).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
