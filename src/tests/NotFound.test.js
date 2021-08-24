import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa o componente NotFound.js', () => {
  beforeEach(() => {
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/rota-nao-existente');
  });

  test('Deve exibir um heading com o texto /"Page requested not found 😭/"', () => {
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Deve mostrar uma imagem de Pikachu desolado', () => {
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
