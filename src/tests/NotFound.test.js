import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('<NotFound.js /> Integration Tests:', () => {
  test('1) Se página contém um heading "h2" com o texto "Page requested not found 😭".',
    () => {
      render(<MemoryRouter><NotFound /></MemoryRouter>);

      const headingText = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/,
      });

      expect(headingText).toBeInTheDocument();
    });

  test('2) Se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".',
    () => {
      render(<MemoryRouter><NotFound /></MemoryRouter>);

      const imgPageNotFound = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );

      expect(imgPageNotFound).toBeInTheDocument();
      expect(imgPageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
