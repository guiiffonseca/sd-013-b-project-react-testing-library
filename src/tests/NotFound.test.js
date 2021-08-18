import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('NotFound.js tests', () => {
  test('Testa se uma página não encontrada tem um h2 com um texto específico', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existente');

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  test('Testa se há uma imagem específica na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existente');

    const imageNotFound = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(imageNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
