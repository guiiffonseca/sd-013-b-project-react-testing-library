import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('Verifica se página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const notFound = screen.getByRole('heading',{
        level: 2,
        name: /Page requested not found/i,
      });
      expect(notFound).toBeInTheDocument();
    });
  test('Verifica se a página mostra uma imagem  ', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
