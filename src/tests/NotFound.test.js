import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('testing cases of NotFound component', () => {
  test('has the text "Page request not found"', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/path-undefined');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('has the image with right alt and src', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/path-undefined');
    const notFoundPageImage = screen.getByAltText(/Pikachu crying/i);
    expect(notFoundPageImage).toBeInTheDocument();
    expect(notFoundPageImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
