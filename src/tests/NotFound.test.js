import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4 - NotFound.js tests.', () => {
  it(`Ao entrar na página verifica se página contém 
  um "heading h2" com o texto "Page requested not found 😭"`, () => {
    renderWithRouter(<NotFound />);

    const requestedText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(requestedText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`, () => {
    renderWithRouter(<NotFound />);
    /* referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */

    const Url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(imgNotFound).toHaveAttribute('src', Url);
  });
});
