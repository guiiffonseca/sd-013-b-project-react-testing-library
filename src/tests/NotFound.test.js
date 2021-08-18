import React from 'react';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../components';

describe('Not found tests', () => {
  beforeEach(() => render(<NotFound />));

  test('If has a text indicating not found', () => {
    const text = screen.getByRole('heading', { level: 2 });
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(/page requested not found/i);
  });

  test('If has an image on the page', () => {
    const img = screen.getByAltText(/pikachu/i);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgSrc);
  });
});
