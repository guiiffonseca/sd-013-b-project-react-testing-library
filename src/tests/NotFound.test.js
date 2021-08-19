import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';

describe('NotFound.js Tests', () => {
  let history;
  const notFoundData = {
    text: 'Page requested not found',
    emoji: '😭',
    img: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    altText: 'Pikachu crying because the page requested was not found',
  };
  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    history.push('/inexistent-page');
  });

  test('A página contém um heading h2 com o texto Page requested not found 😭.', () => {
    const notFoundHeading = screen.getByRole('heading', { level: 2 });

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundHeading.innerHTML).toMatch(new RegExp(notFoundData.text, 'i'));
    expect(notFoundHeading.innerHTML).toMatch(new RegExp(notFoundData.emoji));
  });

  test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const notFoundImg = screen.getByAltText(notFoundData.altText);

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toMatch(notFoundData.img);
  });
});
