import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('H2 e img', () => {
  const { history } = renderWithRouter(<NotFound />);
  history.push('/anything');
  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

  const notFoundMsg = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });
  expect(notFoundMsg).toBeInTheDocument();
});
