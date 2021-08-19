import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('H2 com texto', () => {
  renderWithRouter(<App />);
  const text = screen.getByText(/Encountered pokémons/i);
  expect(text).toBeInTheDocument();
});
test('Botão e filtro filtro', () => {
  renderWithRouter(<App />);
  const resetBtn = screen.getByRole('button', { name: 'All' });
  expect(resetBtn).toBeInTheDocument();
});
