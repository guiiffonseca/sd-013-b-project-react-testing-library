import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/helper';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  test('Teste se página contém um heading h2', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pagina-inexistente');

    const notFoundMessege = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });

    expect(notFoundMessege).toBeInTheDocument();
  });

  test('Teste se página exibe uma imagem', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pagina-inexistente');

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen.getByAltText(/Pikachu crying because/i);

    expect(notFoundImage).toHaveAttribute('src', src);
    expect(notFoundImage).toBeInTheDocument();
  });
});
