import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

const PAGE_NOT_FOUND = 'Page requested not found';
const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const IMG_ALT = 'Pikachu crying because the page requested was not found';

describe('Teste o componente <NotFound.js />', () => {
  it('Possui h2 com texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(PAGE_NOT_FOUND)).toBeInTheDocument();
  });
  it('Possui uma imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(IMG_ALT);
    expect(img).toHaveAttribute('src', IMG_SRC);
  });
});
