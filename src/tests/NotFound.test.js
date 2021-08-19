import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Testa o componente `<NotFound.js />`', () => {
  it('Testa se página contém um <h2> com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);
    const notFoundMessage = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundMessage).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen.getByAltText(/Pikachu crying because the page request/i);
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe(imageURL);
  });
});
