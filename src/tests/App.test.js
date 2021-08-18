import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const home = screen.getByRole('link', {
    name: /home/i,
  });
  expect(home).toBeInTheDocument();

  const about = screen.getByRole('link', {
    name: /About/i,
  });
  expect(about).toBeInTheDocument();

  const favPokemon = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(favPokemon).toBeInTheDocument();
});

// Solução pro screen https://stackoverflow.com/questions/64792767/what-is-the-difference-between-getbytext-and-screen-getbytext-in-rtl
