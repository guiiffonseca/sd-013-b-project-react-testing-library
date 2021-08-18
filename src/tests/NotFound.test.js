import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('NotFound ', () => {
  test('Existe um Heading level 2', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/PaginaNãoexistente');

    const TextNotFound = screen.getByText('Page requested not found');
    expect(TextNotFound).toBeInTheDocument();
  });

  test('Existe uma imagem ?', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquecoisa');

    const NotFoundImage = screen.getByAltText(/Pikachu crying /);

    expect(NotFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
