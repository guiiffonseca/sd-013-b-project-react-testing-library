import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';

describe('Testa o componente NotFound.js', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/page-not-found');
    const notFoundText = screen.getByRole('heading', { level: 2 });
    const img = screen.getByAltText(/pikachu/i);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', URL);
    expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  });

  test('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/page-not-found');
    const img = screen.getByAltText(/pikachu/i);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', URL);
  });
});
