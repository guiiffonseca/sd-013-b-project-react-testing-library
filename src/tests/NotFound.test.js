import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';

import NotFound from '../components/NotFound';

test('A seção apresenta os dizeres "Page requested not found 😭".', () => {
  const { history } = renderWithRouter(<NotFound />);
  const rendersNotFound = screen.getByRole('heading').innerHTML;
  const renderedResult = rendersNotFound;
  const headingText = "Page requested not found";
  const headingEmoji = "<span role=\"img\" aria-label=\"Crying emoji\"> 😭</span>"
  expect(renderedResult).toBe(`${headingText}${headingEmoji}`);
});

test('Pikachu está triste 😢.', () => {
  const { history } = renderWithRouter(<NotFound />);
  const rendersImg = screen.getAllByRole('img')[1];
  const cryingPikachu = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(rendersImg.src).toBe(`${cryingPikachu}`);
});
  
  