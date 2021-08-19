import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se página mostra o texto Page requested not found', () => {
  render(<NotFound />);
  const pageNotFound = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(pageNotFound).toBeInTheDocument();
});
test('Teste se página mostra uma certa imagem', () => {
  render(<NotFound />);
  const img = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(img)
    .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(img)
    .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
});
