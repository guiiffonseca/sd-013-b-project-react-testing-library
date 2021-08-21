import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('A página deve conter um heading h2 com o texto About Pokédex.', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const pokedexImageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const aboutPokedexText = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(aboutPokedexText).toBeInTheDocument();
  const pokemonText = screen.getAllByText(/pokémons/i);
  expect(pokemonText.length).toBe(2);
  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', pokedexImageUrl);
});
