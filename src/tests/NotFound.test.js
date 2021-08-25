import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste do componente notFound', () => {
  test('testa se a página contém um heading h2 com testo PAGE REQUEST NOT FOUND', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
