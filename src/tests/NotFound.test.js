import React from 'react';

import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testando componete NoFound', () => {
  it('Testa se há um heding h2 Page requested not found 😭', () => {
    render(<NotFound />);
    const theresNoText = screen.getByText(/Page requested not found/i);
    expect(theresNoText).toBeInTheDocument();
  });
  it('Testa se há a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const imgText = /Pikachu crying because the page requested was not found/;
    const img = screen.getByAltText(imgText);
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
