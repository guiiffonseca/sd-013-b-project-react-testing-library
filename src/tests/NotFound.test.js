import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

test('Contém um h2 com o texto Page requested not found 😭', () => {
  const emoji = '<span role="img" aria-label="Crying emoji"> 😭</span>';
  renderWithRouter(<NotFound />);
  const H2Element = screen.getByRole('heading', { level: 2 });
  expect(H2Element).toBeInTheDocument();
  expect(H2Element.innerHTML).toBe(`Page requested not found${emoji}`);
});

test('Exibe na tela a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const altText = 'Pikachu crying because the page requested was not found';
  renderWithRouter(<NotFound />);
  const linkElement = screen.getByAltText(altText);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
