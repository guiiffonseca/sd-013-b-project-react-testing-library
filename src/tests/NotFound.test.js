import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando a componente Not Found', () => {
  it('A pagina contém um heading level 2 com texto', () => {
    renderWithRouter(<NotFound />);
    const message = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(message).toHaveTextContent('Page requested');
  });
  it('A página contém uma imagem gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
