import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('', () => {
  const { getByText, getByRole } = render(
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
