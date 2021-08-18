import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test 2- Testing about', () => {
  test('Testing if page shows information about pokedex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getAllByText('/containing all Pokémons/i');
    expect(aboutText).toBeInTheDocument();
  });
  test('Test if page have a heading H2 with text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutHeader = screen.getByRole('heading', { level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeader).toBeInTheDocument();
  });

  test('Test if page has 2 paragraphs', () => {
    renderWithRouter(<About />);

    const aboutParaphs = screen.getByRole('/pokemons/i');
    expect(aboutParaphs).toHaveLength(2);
  });
  test('Test if images of pokedex are shown', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
