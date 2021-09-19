import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente NotFound.js', () => {
  test('Página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(screen
      .getByRole('heading', { level: 2, name: 'Page requested not found 😭' }))
      .toBeInTheDocument();
  });
});
