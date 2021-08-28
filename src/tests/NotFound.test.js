import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../routes/router';

import NotFound from '../components/NotFound';

test('A seção apresenta os dizeres "Page requested not found 😭".', () => {
  renderWithRouter(<NotFound />);
  const rendersNotFound = screen.getByRole('heading').innerHTML;
  const headingText = 'Page requested not found';
  const headingEmoji = '<span role="img" aria-label="Crying emoji"> 😭</span>';
  expect(rendersNotFound).toBe(`${headingText}${headingEmoji}`);
});

test('Pikachu está triste 😢.', () => {
  renderWithRouter(<NotFound />);
  const rendersImg = screen.getAllByRole('img')[1];
  const cryingPikachu = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(rendersImg.src).toBe(`${cryingPikachu}`);
});
