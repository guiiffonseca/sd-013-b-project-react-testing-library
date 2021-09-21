import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('testando pagina NotFound', () => {
  test('testa se a pagina tem um h2', () => {
    renderWithRouter(<NotFound />);

    const FoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(FoundText).toBeInTheDocument();
  });

  test('Teste se a pagina mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
