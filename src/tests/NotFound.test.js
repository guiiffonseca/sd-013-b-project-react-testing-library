import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('testando a pag Not Fund', () => {
  test('testando se o texto Page requested not found renderiza', () => {
    render(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('testa se a img renderiza na tela', () => {
    render(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying /i);
    // https://github.com/testing-library/react-testing-library/issues/43 encontrado toHaveAttribute;
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
