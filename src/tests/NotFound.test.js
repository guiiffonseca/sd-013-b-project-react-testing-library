import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from './util/renderWithRouter';

describe('Testando o "NotFound"', () => {
  it('Testando o "NotFound"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found /i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
    const url = ('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    const alt = (/Pikachu crying because the page requested was not found/i);
    const img = screen.getByAltText(alt);
    expect(img.src).toBe(url);
    expect(img).toBeInTheDocument();
  });
});
