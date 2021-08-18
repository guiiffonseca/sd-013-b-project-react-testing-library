import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('NotFound.js tests', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('should have a heading h2 with the text "Page requested not found 😭"', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: /Page requested not found/ }),
    ).toBeInTheDocument();
  });

  it('should show a picture', () => {
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
