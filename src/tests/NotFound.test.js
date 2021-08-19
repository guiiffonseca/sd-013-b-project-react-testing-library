import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing NotFound component', () => {
  test('If page contains a heading h2 with the text Page requested not found', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('If an image is shown', () => {
    render(<NotFound />);
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
