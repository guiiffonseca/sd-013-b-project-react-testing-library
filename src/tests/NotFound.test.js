import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);
  const h2Text = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(h2Text).toBeInTheDocument();
});

test('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const image = screen.getByAltText(/Pikachu crying/i);
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
