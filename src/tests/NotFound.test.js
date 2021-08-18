import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o Componente Not Found', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const image = screen.getByRole('img', { name:
      'Pikachu crying because the page requested was not found',
    });
    expect(image.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
