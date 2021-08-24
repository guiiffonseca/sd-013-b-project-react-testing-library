import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('testando a pag Not Fund', () => {
  test('testando se o texto Page requested not found renderiza', () => {
    render(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('testa se a img renderiza na tela', () => {
    render(<NotFound />);
    const imgNot = screen.getAllByRole('img')[1];
    expect(imgNot.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
