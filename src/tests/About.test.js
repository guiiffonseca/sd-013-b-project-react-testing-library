import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

// Requisito 2
test('if it renders information about Pokedex', () => {
  renderWithRouter(<About />);

  const info1 = screen.getByText(/This application simulates a Pokédex/);
  const info2 = screen.getByText(/One can filter Pokémons by type/);

  expect(info1).toBeInTheDocument();
  expect(info2).toBeInTheDocument();
});

test('if it renders the title of the About Page', () => {
  renderWithRouter(<About />);

  const title = screen.getByText(/About Pokédex/);

  expect(title).toBeInTheDocument();
});

test('if it renders a Pokédex image', () => {
  renderWithRouter(<About />);

  const img = screen.getByAltText('Pokédex');

  expect(img).toBeInTheDocument();
  expect(img.src).toBe(
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
