import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa quando não encontrar nenhuma página', () => {
  it('Renderiza um heading e seu texto', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/ });
    const headingImg = screen.getByLabelText('Crying emoji');
    expect(heading).toBeInTheDocument();
    expect(headingImg).toBeInTheDocument();
    expect(headingImg).toHaveTextContent('😭');
  });

  it('Renderiza a imagem da página', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
