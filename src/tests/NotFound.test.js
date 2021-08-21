import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testando o componente NotFound', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });
  test('se existe a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
