import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';
import data from '../data';

describe('tests the component Pokedex and its elements', () => {
  beforeEach(() => renderWithRouter(<App />));

  // POKEMON_TYPE definido em razão do lint;
  const POKEMON_TYPE = 'pokemon-type';

  it('should have h2 with "Encountered pokémons" text', () => {
    const heading = screen.getByRole('heading', { level: 2, name: /encountered/i });
    expect(heading).toBeInTheDocument();
  });

  it('should display the next Pokémon when the Next Pokémon button is clicked', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Charmander');
  });

  it('should click on last pokemon and display the first pokemon of the list', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    data.forEach((pokemon, index) => {
      if (pokemon[index] < data.length) {
        userEvent.click(nextButton);
      }
    });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
  });

  it('should have the filters buttons and when clicked, appers the pokemon types', () => {
    const fireTypes = screen.getByRole('button', { name: 'Fire' });
    expect(fireTypes).toBeInTheDocument();
    userEvent.click(fireTypes);
    expect(screen.getByTestId(POKEMON_TYPE)).toHaveTextContent('Fire');

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    const AMOUT_OF_TYPE_BUTTONS = 7;
    const typesButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typesButtons.length).toBe(AMOUT_OF_TYPE_BUTTONS);
  });

  it('should have a reset button with "All" text, when clicked reset pokemons', () => {
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);
    const poisonType = screen.getByTestId(POKEMON_TYPE);
    expect(poisonType).toHaveTextContent(/poison/i);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    const electricType = screen.getByTestId(POKEMON_TYPE);
    expect(electricType).toHaveTextContent('Electric');
  });
});

/*
toHaveTextContent sugerido pelo Rodrigo no Whatsapp e link para entender como usar
https://openbase.com/js/@testing-library/jest-native/documentation
*/
