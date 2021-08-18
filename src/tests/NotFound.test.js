import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Component NotFound tests', () => {
  it('should have a heading with text Page requested not found', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('should have an image', () => {
    render(<NotFound />);

    const notFoundImage = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(notFoundImage.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
