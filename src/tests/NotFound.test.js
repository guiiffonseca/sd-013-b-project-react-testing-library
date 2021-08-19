import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './helper/renderWithRouter';

// Teste o componente <NotFound.js />
describe('NotFound component:', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  // Teste se página contém um heading h2 com o texto Page requested not found 😭
  test('has a h2 whit text "Page requested not found:😭"', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });
  // Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
  test('has a img', () => {
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
