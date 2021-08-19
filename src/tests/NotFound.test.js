import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa página not found', () => {
  it('deve rederizar um heading 2', () => {
    renderWithRouter(<NotFound />);
    const notFoundMessage = screen.getByText(/Page requested not found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });
  it('deve rederizar uma imagem com determinda fonte', () => {
    renderWithRouter(<NotFound />);
    const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuImg = screen.getAllByRole('img');

    expect(pikachuImg[1].src).toBe(urlImage);
  });
});
