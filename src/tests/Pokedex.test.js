import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the component <Pokedex.js />', () => {
  // Instead of using the render function in every "it", I can refactor by using this function
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('the page must have an h2 element written "Encountered pokémons"', () => {
    // Using RegEx to get the h2 element (Flag i - case insensitive):
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    // I expect the h2 element to exist:
    expect(h2).toBeInTheDocument();
  });

  it('show the next pokemon on the list if the next button is activated', () => {
    // The first test is to know if the first pokemon is there:
    const card = screen.getByText(/Pikachu/i);
    expect(card).toBeInTheDocument();

    // Get the next button element:
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    // Mock the click in the next button:
    userEvent.click(nextButton);

    // See if the next pokemon is the right one:
    const cardCharmander = screen.getByText(/Charmander/i);
    expect(cardCharmander).toBeInTheDocument();

    // Again: Mock the click in the next button:
    userEvent.click(nextButton);

    // See if the pokemon is the expected one:
    const cardCaterpie = screen.getByText(/Caterpie/i);
    expect(cardCaterpie).toBeInTheDocument();
  });

  it('the page must show only one pokemon', () => {
    // Verify if there is only one pokemon in the page:
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('test if there are any filter options', () => {
    // Get the element that filter pokemons:
    const filter = screen.getAllByTestId('pokemon-type-button');

    // Creating an array with the types of pokemon to use in the next tests:
    const typesList = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];

    // The filter lenght must be exactly the number of existing types of pokemons:
    expect(filter.length).toBe(typesList.length);

    // Now we will use the list of types to see if there are buttons with the same name:
    filter.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(typesList[index]);
    });
  });

  it('should have a button with inner text equal to All', () => {
    // Test if there is an All button:
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    // Click in the all button:
    userEvent.click(allButton);
  });
});
