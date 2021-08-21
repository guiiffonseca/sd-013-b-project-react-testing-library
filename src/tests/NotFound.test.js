import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './util/renderWithRouter';

describe('tests the component NotFound and its elements', () => {
  beforeEach(() => renderWithRouter(<NotFound />));

  it('should have a h2 with "Page requested not found" text', () => {
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('should have a Pikachu image', () => {
    const image = screen.getByAltText(/pikachu crying/i);
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toStrictEqual(link);
  });
});
