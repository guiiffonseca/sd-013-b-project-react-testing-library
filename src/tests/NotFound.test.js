import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requirement 4 - Test the not found page', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('should the page have the h2 element with text "Page requested not found"', () => {
    const h2Title = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2Title).toBeInTheDocument();
  });

  it('should the page contains the pikachu crying image', () => {
    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});