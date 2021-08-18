import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('testing motFound', () => {
  describe('test notFound', () => {
    it('should be page notfound', async () => {
      render(<NotFound />);
      const image = screen.getByRole('img', {
        name: 'Pikachu crying because the page requested was not found',
      });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      const text = screen.getByRole('heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      });
      expect(text).toBeInTheDocument();
    });
  });
});
