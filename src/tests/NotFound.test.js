import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js', () => {
  test('testa se contém um h2 com texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const textNotFund = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(textNotFund).toBeInTheDocument();
  });
  test('testa se mostra imagem ', () => {
    renderWithRouter(<NotFound />);

    // https://stackoverflow.com/questions/54593369/unable-to-find-an-element-with-the-text-mytext-error-when-using-react-testing
    const image = screen.getByAltText(/pikachu crying because the page/i);

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
