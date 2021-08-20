import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('if it renders an h2 with Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);
  const h2Title = screen.getByText('Page requested not found');
  const cryingEmoji = screen.getByLabelText('Crying emoji');

  expect(h2Title).toBeInTheDocument();
  expect(cryingEmoji).toBeInTheDocument();
});

test('if there is an image with the specific src', () => {
  renderWithRouter(<NotFound />);
  const sadPikachu = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(sadPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(sadPikachu).toBeInTheDocument();
});
