import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import { renderWithRouter } from '../components/utils/renderWithRouter';

describe('testes do componente "NotFound"', () => {
  test('testa se a page contem um h2 com certo texto', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/shuahsuahs');
    const heading = screen.getByText(/page requested not found/i);
    expect(heading).toBeInTheDocument();
    const imagem = screen.getAllByRole('img')[1];
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
