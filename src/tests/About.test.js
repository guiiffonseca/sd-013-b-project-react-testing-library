import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('H2', () => {
  renderWithRouter(<About />);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(h2).toBeInTheDocument();
});

test('2-p', () => {
  renderWithRouter(<About />);
  const p1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
  expect(p1).toBeInTheDocument();
  const p2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
  expect(p2).toBeInTheDocument();
});

test('img', () => {
  renderWithRouter(<About />);
  const image = screen.getByAltText('Pokédex');
  expect(image.src)
    .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(image).toBeInTheDocument();
});

// Onde achei a solução https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
