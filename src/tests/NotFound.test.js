import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Teste NotFound', () => {
  test('Verifica se a página contém um h2 com o texto Page requested not found 😭', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const notFoundHeading = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });
  test('Verifica se a página contém uma imagem específica', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const notFoundImage = screen.getByAltText(/Pikachu crying because the page/i);
    expect(notFoundImage.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
