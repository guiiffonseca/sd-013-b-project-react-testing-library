import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './helper/renderWithRouter';

describe('NotFound component:', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  test('has a h2 whit text "Page requested not found:😭"', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });
  test('has a img', () => {
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
