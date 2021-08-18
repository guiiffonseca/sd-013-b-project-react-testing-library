import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes no arquivo About.test.js', () => {
  test('if the page contains info about the Pokédex', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(headingAbout).toBeInTheDocument();
  });

  test('if the page contains an image', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('if the page contains two paragraphs with the text Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexParagraph = screen.getAllByText(/pokémons/i);
    expect(pokedexParagraph).toHaveLength(2);
  });
});
