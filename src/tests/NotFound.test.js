import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testes da tela NotFound', () => {
  it('Test screen elements', () => {
    render(
      <NotFound />,
    );
    const text = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    const img = screen.getByRole('img', {
      name: /Pikachu crying/,
    });
    expect(text && img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
