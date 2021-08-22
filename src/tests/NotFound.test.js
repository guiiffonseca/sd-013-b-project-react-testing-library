import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';
import { NotFound } from '../components';

describe('Testando NotFound ', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Testando se o texto "Page requested not found" é renderizado na página', () => {
    const getText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(getText).toBeInTheDocument();
  });

  it('Testa se é exibido o gif do pikachu chorando', () => {
    const gif = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(gif).toBeInTheDocument();
    expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
