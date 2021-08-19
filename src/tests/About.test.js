import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);

  expect(screen.getByRole('heading', {
    level: 2,
    name: /about pokédex/i,
  })).toBeInTheDocument();

  expect(screen.getByText(/This application simulates/i))
    .toBeInTheDocument();
  expect(screen.getByText(/One can filter Pokémons/i))
    .toBeInTheDocument();
  expect(screen.getByRole('img').src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
