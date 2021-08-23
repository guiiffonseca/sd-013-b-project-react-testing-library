import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do component <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { name: /Page requested not found/i, level: 2 }));
  });

  test('Se se página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getAllByRole('img')[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
