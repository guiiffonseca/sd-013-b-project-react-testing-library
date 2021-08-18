import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('should have the heading \'Page requested not found 😭\'', () => {
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found 😭');
  });

  it('should have the image \'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif\'', () => {
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
