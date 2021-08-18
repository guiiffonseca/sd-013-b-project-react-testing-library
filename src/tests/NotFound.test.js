import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test component page not found', () => {
  it('should contain a h2 with the text Page requested not found', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should display image', () => {
    render(<NotFound />);

    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
