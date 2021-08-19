import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

test('Testa pagina Not Found', () => {
  renderWithRouter(<NotFound />);

  expect(screen.getByRole('heading', { name: /Page requested not found/i, level: 2 }));
  expect(screen.getAllByRole('img')[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
